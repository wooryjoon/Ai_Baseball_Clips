import { instance } from '.';
import axios from 'axios';

export function requestPresignedUrl(uploadFile: File) {
    instance
        .post('presigned-url', { filename: uploadFile.name })
        .then((response) => {
            const presignedUrl = response.data;
            console.log(presignedUrl);
            UploadFiletoS3(presignedUrl, uploadFile);
        })
        .catch((error) => console.error(error));
}

export function UploadFiletoS3(presignedUrl: string, uploadFile: File) {
    axios
        .put(presignedUrl, uploadFile, {
            headers: {
                'Content-Type': 'video/mp4',
            },
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}
