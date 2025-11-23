import BaseRepository from "@shared/base/base-repository";
import { Expense } from "./expense-entity";
import { ListByCategoryQuery } from "./params/list-by-category-query";

export default class ExpenseRepository extends BaseRepository<Expense> {
    constructor() {
        super(Expense);
    }

    listByCategory(query: ListByCategoryQuery) {
        const start = new Date(query.date.getFullYear(), query.date.getMonth(), 1),
            end = new Date(query.date.getFullYear(), query.date.getMonth() + 1, 1);

        return this.repository
            .createQueryBuilder("e")
            .leftJoin("e.category", "c")
            .select([
                "c.description AS description",
                "JSON_AGG(e) AS expenses"
            ])
            .where("e.date >= :start AND e.date < :end", { start, end })
            .groupBy("c.id")
            .addGroupBy("c.description")
            .orderBy("c.description", "ASC")
            .getRawMany();
    }

    sumByMonth(date: Date) {
        const start = new Date(date.getFullYear(), date.getMonth(), 1),
            end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        
        return this.repository
            .createQueryBuilder("e")
            .select("COALESCE(SUM(e.amount), 0)", "total")
            .where("e.date >= :start AND e.date < :end", { start, end })
            .getRawOne();
    }
}
