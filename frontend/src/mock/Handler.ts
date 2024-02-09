import { HttpResponse, http, delay } from 'msw';
import { clipData } from './dummydata';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const signUpUrl = baseUrl + import.meta.env.VITE_API_SIGNUP_URL;
const loginUrl = baseUrl + import.meta.env.VITE_API_LOGIN_URL;
console.log(loginUrl);
const emailUrl = baseUrl + import.meta.env.VITE_API_EMAIL_CHECK_URL;
const clipUrl = baseUrl + import.meta.env.VITE_API_CLIP_URL;

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
    // 하이라이트 영상 fetch 모킹
    http.get(clipUrl, async ({ request }) => {
        await delay(1000);
        const { searchParams } = new URL(request.url);
        const size = Number(searchParams.get('size'));
        const page = Number(searchParams.get('page'));
        const totalCount = clipData.length;
        const totalPages = Math.round(totalCount / size);

        return HttpResponse.json(
            {
                contents: clipData.slice(page * size, (page + 1) * size),
                pageNumber: page,
                pageSize: size,
                totalPages,
                totalCount,
                isLastPage: totalPages <= page,
                isFirstPage: page === 0,
            },
            { status: 200 }
        );
    }),
];
