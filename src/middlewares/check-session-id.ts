import type { FastifyRequest, FastifyReply } from 'fastify';
export async function checkSessionId(request: FastifyRequest, reply: FastifyReply) {
  const sessionId = request.cookies.sessionId;
  if (!sessionId) {
    reply.status(401).send({
      message: 'Unauthorirized'
    })
  }
}