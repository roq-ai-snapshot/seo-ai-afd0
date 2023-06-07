import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { contentSuggestionValidationSchema } from 'validationSchema/content-suggestions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.content_suggestion
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getContentSuggestionById();
    case 'PUT':
      return updateContentSuggestionById();
    case 'DELETE':
      return deleteContentSuggestionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getContentSuggestionById() {
    const data = await prisma.content_suggestion.findFirst(convertQueryToPrismaUtil(req.query, 'content_suggestion'));
    return res.status(200).json(data);
  }

  async function updateContentSuggestionById() {
    await contentSuggestionValidationSchema.validate(req.body);
    const data = await prisma.content_suggestion.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteContentSuggestionById() {
    const data = await prisma.content_suggestion.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
