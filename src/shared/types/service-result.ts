export type ServiceResult<T = void> = {
    success: boolean;
    data?: T | Partial<T>;
    message?: string;
}