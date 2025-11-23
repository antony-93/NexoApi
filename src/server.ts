import fastifyAutoload from '@fastify/autoload';
import fastify, { FastifyInstance } from 'fastify';
import path from 'path';

export function buildServer() {
    const app = fastify({
        logger: true
    });

    app.register(fastifyAutoload, {
        dir: path.join(__dirname, 'modules'),
        dirNameRoutePrefix: true,
    });

    return app;
}
