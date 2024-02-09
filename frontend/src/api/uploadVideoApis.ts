import { instance } from '.';
import axios from 'axios';

export const upload = async (uploadFile: File) => {
    try {
        const partSize = 5 * 1024 * 1024; // 5MB
        const parts: any[] = [];

        const getResponse = await instance.get('S3/generate-url', {
            params: { filename: uploadFile.name, filesize: uploadFile.size },
            headers: {
                'ngrok-skip-browser-warning': '69420',
            },
        });

        const presignedUrls = getResponse.data.presignedUrls;
        const uploadId = getResponse.data.uploadId;

        for (let i = 0; i < Math.ceil(uploadFile.size / partSize); i++) {
            let start = i * partSize,
                end = Math.min(start + partSize, uploadFile.size),
                part = uploadFile.slice(start, end);

            const uploadResponse = await axios.put(presignedUrls[i], part, {
                headers: {
                    'Content-Type': part.type,
                },
            });

            parts.push({ ETag: uploadResponse.headers.etag, PartNumber: i + 1 });
        }

        await instance.post('/complete-upload', { parts: parts, uploadId: uploadId });

        return true;
    } catch (error) {
        alert('업로드 중 에러가 발생했습니다. 다시 시도해주세요.');
        console.log(error);
        return false;
    }
};
