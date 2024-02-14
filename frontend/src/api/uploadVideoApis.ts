import { instance } from '.';
import axios from 'axios';

export async function upload(uploadFile: File) {
    return await instance
        .get('S3/generate-url', {
            params: { filename: uploadFile.name },
        })
        .then((response) => {
            console.log('get 요청 보냄');
            const presignedUrl = response.data;
            console.log(presignedUrl);
            UploadFiletoS3(presignedUrl, uploadFile);
        })
        .catch((error) => {
            alert('업로드 중 문제가 발생했습니다.');
            console.error(error);
        });
}

function UploadFiletoS3(presignedUrl: string, uploadFile: File) {
    console.log('presigned url 로 파일 전송하기 실행');
    axios
        .put(presignedUrl, uploadFile, {
            headers: {
                'Content-Type': 'video/*',
            },
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}
