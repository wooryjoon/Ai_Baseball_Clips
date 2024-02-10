import { instance } from '.';
import axios from 'axios';

export const upload = async (uploadFile: File) => {
    try {
        // console.log(uploadFile.name);
        // console.log(uploadFile.size);

        const partSize = 10 * 1024 * 1024; // 10MB
        const parts: any[] = [];

        const getResponse = await instance.get('S3/generate-multiparturl', {
            params: { filename: uploadFile.name, filesize: uploadFile.size },
            headers: {
                'ngrok-skip-browser-warning': '69420',
            },
        });

        console.log('getResponse: ');
        console.log(getResponse);

        const presignedUrls = getResponse.data.presignedUrls;
        const uploadId = getResponse.data.uploadId;

        // console.log('presignedUrls : ' + presignedUrls);
        // console.log('uploadId : ' + uploadId);

        for (let i = 0; i < Math.ceil(uploadFile.size / partSize); i++) {
            let start = i * partSize,
                end = Math.min(start + partSize, uploadFile.size),
                part = uploadFile.slice(start, end);

            await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 대기

            const uploadResponse = await axios.put(presignedUrls[i], part, {
                headers: {
                    'Content-Type': part.type,
                },
            });
            console.log(uploadResponse.status);
            console.log(uploadResponse.headers);
            console.log('ETag:', uploadResponse.headers.etag);

            parts.push({ etag: uploadResponse.headers.etag, partNumber: i + 1 });
        }

        console.log('Ok');

        await instance.post('S3/complete-upload', { parts: parts, uploadId: uploadId });

        console.log('영상 업로드 완료!');

        return true;
    } catch (error) {
        alert('업로드 중 에러가 발생했습니다. 다시 시도해주세요.');
        console.log(error);
        return false;
    }
};
