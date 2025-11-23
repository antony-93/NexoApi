import { FastifyReply, FastifyRequest } from "fastify";
import { SummaryQuery } from "./params/summary-query";
import { fail } from "@shared/helpers/service-result";
import ReportsService from "./reports-service";

export default class ReportsController {
    constructor(private _reportsService = new ReportsService()) {}

    summary = async (req: FastifyRequest<{ Querystring: SummaryQuery }>, reply: FastifyReply) => {
        try {
            const validation = SummaryQuery.safeParse(req.query);

            if (!validation.success) {
                return reply.status(400).send(fail('Parâmetros inválidos'));
            }

            const result = await this._reportsService.summary(validation.data);

            if (!result.success) {
                return reply.status(422).send(result);
            }

            return reply.status(200).send(result);
        } catch (e) {
            console.log(e)
            return reply.status(500).send({
                success: false,
                message: "Internal server error"
            });
        }
    }
}