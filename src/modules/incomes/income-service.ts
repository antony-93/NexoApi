import { ServiceResult } from "@shared/types/service-result";
import IncomeRepository from "./income-repository";
import { ok } from "@shared/helpers/service-result";
import { CreateIncomeDto } from "./dto/create-income-dto";
import { Income } from "./income-entity";
import { IncomeRecurrenceType } from "./enums/income-recurrence-type-enum";

export default class IncomeService {
    constructor(private _incomeRepo = new IncomeRepository()) { }

    async create(data: CreateIncomeDto): Promise<ServiceResult<{ id: string }>> {
        const income = new Income();

        income.amount = data.amount;
        income.description = data.description;
        income.recurrenceType = data.recurrenceType;

        if (income.recurrenceType === IncomeRecurrenceType.ONE_TIME) {
            income.date = data.date;
        }

        const result = await this._incomeRepo.save(income);

        return ok({ id: result.id }, 'Receita criada com sucesso!');
    }

    async list(): Promise<ServiceResult<Income[]>> {
        const expenses = await this._incomeRepo.list();
        return ok(expenses, 'Receitas listas com sucesso');
    }
}