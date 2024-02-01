import { HttpResponse, http, delay } from 'msw';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const signUpUrl = baseUrl + import.meta.env.VITE_API_SIGNUP_URL;
const loginUrl = baseUrl + import.meta.env.VITE_API_LOGIN_URL;
const emailUrl = baseUrl + import.meta.env.VITE_API_EMAIL_CHECK_URL;

export const handlers = [
    // 회원가입 모킹
    http.post(signUpUrl, async () => {
        await delay(1000);
        return HttpResponse.json(null, { status: 200 });
    }),
    // 로그인 모킹
    http.post(loginUrl, async () => {
        await delay(1000);
        const response = {
            id: 1,
            email: 'head0618@naver.com',
            accessToken: 'asdasd',
            refreshToken: 'asdasd',
        };
        return HttpResponse.json(response, { status: 200 });
    }),
    // 이메일 중복 체크 모킹
    http.get(emailUrl + '/:email', async () => {
        await delay(1000);
        return HttpResponse.json(null, { status: 200 });
    }),
];
