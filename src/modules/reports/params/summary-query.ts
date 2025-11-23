import { z } from "zod";

export const SummaryQuery = z.object({
    date: z.coerce.date({
        error: 'Obrigatório informar a data'
    })
});

export type SummaryQuery = z.infer<typeof SummaryQuery>;