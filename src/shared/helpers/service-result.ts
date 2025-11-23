import { ServiceResult } from "@shared/types/service-result";

export function ok<T>(data: T, message?: string): ServiceResult<T> {
    return {
        success: true,
        data,
        message
    };
}

export function fail<T = void>(message?: string): ServiceResult<T> {
    return { 
        success: false,
        message 
    };
}