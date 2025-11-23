import { z } from "zod";

export const CreateExpenseDto = z.array(z.object({
    description: z.string().min(1, "Descrição é obrigatória"),
    amount: z.number().positive("O valor deve ser positivo"),
    categoryId: z.uuid({ message: "ID da categoria inválido" }),
    date: z.coerce.date({
        error: "Data de pagamento deve ser uma data válida"
    })
}));

export type CreateExpenseDto = z.infer<typeof CreateExpenseDto>;