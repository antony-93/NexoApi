import { FastifyInstance } from "fastify";
import CategoryController from "./category-controller";

const categoryController = new CategoryController();

export default async function (app: FastifyInstance) {
    app.post('/', categoryController.create);
    app.get('/', categoryController.list);
}
