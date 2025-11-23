import ExpenseRepository from "@modules/expenses/expense-repository";
import IncomeRepository from "@modules/incomes/income-repository";
import { SummaryQuery } from "./params/summary-query";
import { ok } from "@shared/helpers/service-result";
import { ServiceResult } from "@shared/types/service-result";
import { SummaryResponseDto } from "./dto/summary-response-dto";

export default class ReportsService {
    constructor(
        private _incomeRepo = new IncomeRepository(),
        private _expenseRepo = new ExpenseRepository()
    ) {}

    async summary(query: SummaryQuery): Promise<ServiceResult<SummaryResponseDto>> {
        const { date } = query;

        const expenses = await this._expenseRepo.sumByMonth(date),
            incomes = await this._incomeRepo.sumByMonth(date),
            balance = incomes.total - expenses.total;

        return ok({
            expenses: expenses.total,
            incomes: incomes.total,
            balance
        });
    }
}