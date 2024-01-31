interface LoginResponseData {
    id: number;
    email: string;
    accessToken: string;
    refreshToken: string;
}

interface FailResponse {
    message: string;
    errorCode: 'MEMBER_05' | 'MEMBER_04' | 'MEMBER_02';
}
export type { LoginResponseData, FailResponse };
