import { FastifyInstance } from "fastify";
import ExpenseController from "./expense-controller";

const expenseController = new ExpenseController();

export default async function (app: FastifyInstance) {
    app.post('/', expenseController.create);
    app.get('/', expenseController.list);
    app.get('/by-category', expenseController.listByCategory);
}
