type ExpenseDto = {
    id: string;
    description: string;
    amount: number;
    paymentDate: Date;
}

type ListByCategoryDto = {
    category: string;
    expenses: ExpenseDto[];
}

export type ListByCategoryResponseDto = ListByCategoryDto[];