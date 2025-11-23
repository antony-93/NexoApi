import { FastifyInstance } from "fastify";
import IncomeController from "./income-controller";

const incomeController = new IncomeController();

export default async function (app: FastifyInstance) {
    app.post('/', incomeController.create);
    app.get('/', incomeController.list);
}
