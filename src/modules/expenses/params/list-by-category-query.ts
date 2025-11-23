import { z } from "zod";

export const ListByCategoryQuery = z.object({
    date: z.coerce.date({
        error: 'Obrigatório informar a data'
    })
});

export type ListByCategoryQuery = z.infer<typeof ListByCategoryQuery>;