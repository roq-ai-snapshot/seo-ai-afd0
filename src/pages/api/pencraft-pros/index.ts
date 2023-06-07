import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { pencraftProValidationSchema } from 'validationSchema/pencraft-pros';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getPencraftPros();
    case 'POST':
      return createPencraftPro();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPencraftPros() {
    const data = await prisma.pencraft_pro
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'pencraft_pro'));
    return res.status(200).json(data);
  }

  async function createPencraftPro() {
    await pencraftProValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.content_suggestion?.length > 0) {
      const create_content_suggestion = body.content_suggestion;
      body.content_suggestion = {
        create: create_content_suggestion,
      };
    } else {
      delete body.content_suggestion;
    }
    if (body?.integration?.length > 0) {
      const create_integration = body.integration;
      body.integration = {
        create: create_integration,
      };
    } else {
      delete body.integration;
    }
    if (body?.keyword?.length > 0) {
      const create_keyword = body.keyword;
      body.keyword = {
        create: create_keyword,
      };
    } else {
      delete body.keyword;
    }
    if (body?.performance?.length > 0) {
      const create_performance = body.performance;
      body.performance = {
        create: create_performance,
      };
    } else {
      delete body.performance;
    }
    const data = await prisma.pencraft_pro.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
