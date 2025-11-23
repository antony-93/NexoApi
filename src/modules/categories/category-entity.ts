import { Entity, Column, OneToMany } from "typeorm";
import BaseEntity from "@shared/base/base-entity";
import { Expense } from "@modules/expenses/expense-entity";

@Entity("categories")
export class Category extends BaseEntity {
    @Column()
    description!: string;

    @OneToMany(() => Expense, account => account.category)
    expenses!: Expense[];
}