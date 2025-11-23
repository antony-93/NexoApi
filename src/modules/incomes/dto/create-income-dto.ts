import z from "zod";
import { IncomeRecurrenceType } from "../enums/income-recurrence-type-enum";

export const CreateIncomeDto = z.object({
    description: z.string().min(1, 'Descrição é obrigatória'),
    amount: z.number().positive('O valor deve ser positivo'),
    recurrenceType: z.enum(IncomeRecurrenceType, {
        message: "Tipo de recorrência inválido"
    }),
    date: z.coerce.date().optional()
}).refine(
    data => !(data.recurrenceType === IncomeRecurrenceType.ONE_TIME && !data.date),
    {
        message: "Data do recebimento da receita não informado!",
        path: ['receivedAt']
    }
);

export type CreateIncomeDto = z.infer<typeof CreateIncomeDto>;