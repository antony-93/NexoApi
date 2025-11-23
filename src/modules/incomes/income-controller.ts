import { FastifyReply, FastifyRequest } from "fastify";
import IncomeService from "./income-service";
import { fail } from "@shared/helpers/service-result";
import { CreateIncomeDto } from "./dto/create-income-dto";

export default class IncomeController {
    constructor(private _incomeService = new IncomeService()) {}

    create = async (req: FastifyRequest<{ Body: CreateIncomeDto }>, reply: FastifyReply) => {
        try {
            const content = req.body,
                validation = CreateIncomeDto.safeParse(content);

            console.log("=== Content ===", content)
            console.log("=== Validation ===", validation)
            if (!validation.success) {
                return reply.status(400).send(fail('Dados inválidos'));
            }

            const result = await this._incomeService.create(content);

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
            const result = await this._incomeService.list();

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