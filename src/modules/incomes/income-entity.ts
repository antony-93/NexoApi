import { Entity, Column } from "typeorm";
import BaseEntity from "@shared/base/base-entity";
import { IncomeRecurrenceType } from "./enums/income-recurrence-type-enum";

@Entity("incomes")
export class Income extends BaseEntity {
    @Column()
    description!: string;

    @Column({ 
        type: "decimal", 
        precision: 10, 
        scale: 2 
    })
    amount!: number;

    @Column({
        type: 'enum',
        enum: IncomeRecurrenceType,
        name: 'recurrence_type'
    })
    recurrenceType!: IncomeRecurrenceType;

    @Column({ 
        type: 'date', 
        nullable: true,
        name: 'date'
    })
    date?: Date;
}
