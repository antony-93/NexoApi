import BaseRepository from "@shared/base/base-repository";
import { Income } from "./income-entity";

export default class IncomeRepository extends BaseRepository<Income> {
    constructor() {
        super(Income);
    }
}
