import { FastifyInstance } from "fastify";
import ReportsController from "./reports-controller";

const _reportsController = new ReportsController();

export default async function (app: FastifyInstance) {
    app.get('/summary', _reportsController.summary);
}