import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { pencraftProValidationSchema } from 'validationSchema/pencraft-pros';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.pencraft_pro
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPencraftProById();
    case 'PUT':
      return updatePencraftProById();
    case 'DELETE':
      return deletePencraftProById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPencraftProById() {
    const data = await prisma.pencraft_pro.findFirst(convertQueryToPrismaUtil(req.query, 'pencraft_pro'));
    return res.status(200).json(data);
  }

  async function updatePencraftProById() {
    await pencraftProValidationSchema.validate(req.body);
    const data = await prisma.pencraft_pro.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deletePencraftProById() {
    const data = await prisma.pencraft_pro.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
