import { FastifyReply, FastifyRequest } from "fastify";
import CategoryService from "./category-service";
import { CreateCategoryDto } from "./dto/create-category-dto";
import { fail } from "@shared/helpers/service-result";

export default class CategoryController {
    constructor(private _categoryService = new CategoryService()) {}

    create = async (req: FastifyRequest<{ Body: CreateCategoryDto }>, reply: FastifyReply) => {
        try {
            const content = req.body,
                validation = CreateCategoryDto.safeParse(content);
            
            if (!validation.success) {
                return reply.status(400).send(fail('Dados inválidos'));
            }

            const result = await this._categoryService.create(req.body);

            if (!result.success) {
                return reply.status(422).send(result);
            }

            return reply.status(201).send(result);
        } catch (e) {
            return reply.status(500).send({
                success: false,
                message: "Internal server error"
            });
        }
    }

    list = async (_req: FastifyRequest, reply: FastifyReply) => {
        try {
            const result = await this._categoryService.list();

            if (!result.success) {
                return reply.status(422).send(result);
            }

            return reply.status(201).send(result);
        } catch (e) {
            return reply.status(500).send({
                success: false,
                message: "Internal server error"
            });
        }
    }
}