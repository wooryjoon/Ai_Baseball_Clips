import { instance } from '.';
import axios from 'axios';

export function requestPresignedUrl(uploadFile: File) {
    instance
        .get('S3/generate-url', {
            params: { filename: uploadFile.name },
            // headers: {
            //     'ngrok-skip-browser-warning': '69420',
            // },
        })
        .then((response) => {
            console.log(response);
            const presignedUrl = response.data;
            console.log(presignedUrl);
            UploadFiletoS3(presignedUrl, uploadFile);
        })
        .catch((error) => console.error(error));
}

function UploadFiletoS3(presignedUrl: string, uploadFile: File) {
    // console.log(uploadFile);
    axios
        .put(presignedUrl, uploadFile, {
            headers: {
                'Content-Type': 'video/mp4',
            },
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}
