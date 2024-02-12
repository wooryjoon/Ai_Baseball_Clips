import { instance } from '.';
import axios from 'axios';
import { openSSE } from './sse';

export async function upload(uploadFile: File) {
    openSSE();

    // requestId 받아오기
    return await instance
        .get('S3/generate-url', {
            params: { filename: uploadFile.name },
            headers: {
                'ngrok-skip-browser-warning': '69420',
            },
        })
        .then((response) => {
            const presignedUrl = response.data;
            console.log(presignedUrl);
            return UploadFiletoS3(presignedUrl, uploadFile);
        })
        .then(() => true)
        .catch((error) => {
            alert('업로드 중 문제가 발생했습니다.');
            console.error(error);
            return false;
        });
}

function UploadFiletoS3(presignedUrl: string, uploadFile: File) {
    axios
        .put(presignedUrl, uploadFile, {
            headers: {
                'Content-Type': 'video/*',
            },
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}
