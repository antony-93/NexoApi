import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import BaseEntity from "@shared/base/base-entity";
import { Category } from "@modules/categories/category-entity";

@Entity("expenses")
export class Expense extends BaseEntity {
    @Column({ type: "date", name: "date" })
    date!: Date;

    @Column()
    description!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount!: number;
    
    @Column({ name: "category_id" })
    categoryId!: string;

    @ManyToOne(() => Category, group => group.expenses)
    @JoinColumn({ name: "category_id" })
    category!: Category;
}
