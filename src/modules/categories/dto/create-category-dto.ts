import { z } from "zod";

export const CreateCategoryDto = z.object({
    description: z.string().min(1, "Descrição é obrigatória")
});

export type CreateCategoryDto = z.infer<typeof CreateCategoryDto>;