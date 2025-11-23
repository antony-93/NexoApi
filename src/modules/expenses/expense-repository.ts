import BaseRepository from "@shared/base/base-repository";
import { Expense } from "./expense-entity";

export default class ExpenseRepository extends BaseRepository<Expense> {
    constructor() {
        super(Expense);
    }
}
