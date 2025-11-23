import BaseRepository from "@shared/base/base-repository";
import { Income } from "./income-entity";
import { IncomeRecurrenceType } from "./enums/income-recurrence-type-enum";

export default class IncomeRepository extends BaseRepository<Income> {
    constructor() {
        super(Income);
    }

    sumByMonth(date: Date) {
        const start = new Date(date.getFullYear(), date.getMonth(), 1),
            end = new Date(date.getFullYear(), date.getMonth() + 1, 1);

        return this.repository
            .createQueryBuilder("i")
            .select("COALESCE(SUM(i.amount), 0)", "total")
            .where("i.date >= :start AND i.date < :end", { start, end })
            .orWhere(`i.recurrenceType = :recurrenceType`, { recurrenceType: IncomeRecurrenceType.MONTHLY })
            .getRawOne();
    }
}
