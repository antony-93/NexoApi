import { ServiceResult } from "@shared/types/service-result";
import ExpenseRepository from "./expense-repository";
import { CreateExpenseDto } from "./dto/create-expense-dto";
import { Expense } from "./expense-entity";
import { ok } from "@shared/helpers/service-result";

export default class ExpenseService {
    constructor(private _expenseRepo = new ExpenseRepository()) { }

    async create(data: CreateExpenseDto): Promise<ServiceResult<{ ids: string[] }>> {
        const expenses = data.map(e => {
            const expense = new Expense();

            expense.description = e.description;
            expense.amount = e.amount;
            expense.categoryId = e.categoryId;
            expense.date = e.date;

            return expense;
        });

        const result = await this._expenseRepo.saveMultiple(expenses);

        return ok({ ids: result.map(e => e.id) }, 'Despesas criadas com sucesso!');
    }

    async list(): Promise<ServiceResult<Expense[]>> {
        const expenses = await this._expenseRepo.list();
        return ok(expenses, 'Despesas listas com sucesso');
    }
}