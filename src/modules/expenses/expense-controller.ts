import { FastifyReply, FastifyRequest } from "fastify";
import ExpenseService from "./expense-service";
import { CreateExpenseDto } from "./dto/create-expense-dto";
import { fail } from "@shared/helpers/service-result";
import { ListByCategoryQuery } from "./params/list-by-category-query";

export default class ExpenseController {
    constructor(private _expenseService = new ExpenseService()) {}

    create = async (req: FastifyRequest<{ Body: CreateExpenseDto }>, reply: FastifyReply) => {
        try {
            const content = req.body,
                validation = CreateExpenseDto.safeParse(content);

            if (!validation.success) {
                return reply.status(400).send(fail('Dados inválidos'));
            }

            const result = await this._expenseService.create(content);

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
            const result = await this._expenseService.list();

            if (!result.success) {
                return reply.status(422).send(result);
            }

            return reply.status(200).send(result);
        } catch (e) {
            return reply.status(500).send({
                success: false,
                message: "Internal server error"
            });
        }
    }

    listByCategory = async (req: FastifyRequest<{ Querystring: ListByCategoryQuery }>, reply: FastifyReply) => {
        try {
            const validation = ListByCategoryQuery.safeParse(req.query);

            if (!validation.success) {
                return reply.status(400).send(fail('Parâmetros inválidos'));
            }

            const result = await this._expenseService.listByCategory(validation.data);

            if (!result.success) {
                return reply.status(422).send(result);
            }

            return reply.status(200).send(result);
        } catch (e) {
            return reply.status(500).send({
                success: false,
                message: "Internal server error"
            });
        }
    }
}