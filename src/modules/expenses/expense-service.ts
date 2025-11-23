import { ServiceResult } from "@shared/types/service-result";
import ExpenseRepository from "./expense-repository";
import { CreateExpenseDto } from "./dto/create-expense-dto";
import { Expense } from "./expense-entity";
import { ok } from "@shared/helpers/service-result";
import { ListByCategoryQuery } from "./params/list-by-category-query";
import { ListByCategoryResponseDto } from "./dto/list-by-category-response-dto";

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

    async listByCategory(query: ListByCategoryQuery): Promise<ServiceResult<ListByCategoryResponseDto>> {
        const raw = await this._expenseRepo.listByCategory(query);
        
        const dto: ListByCategoryResponseDto = raw.map(r => ({
            category: r.description,
            expenses: r.expenses.map((e: any) => ({
                id: e.id,
                description: e.description,
                amount: Number(e.amount),
                date: new Date(e.date)
            }))
        }))
        
        return ok(dto, 'Despesas por categoria listas com sucesso');
    }
}