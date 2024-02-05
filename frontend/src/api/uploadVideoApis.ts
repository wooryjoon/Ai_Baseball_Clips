import { instance } from '.';
import axios from 'axios';

export function requestPresignedUrl(uploadFile: File) {
    // useNavigate 써서 다음 페이지로 이동

    instance
        .post('presigned-url', { filename: uploadFile.name })
        .then((response) => {
            const presignedUrl = response.data;
            console.log(presignedUrl);
            UploadFiletoS3(presignedUrl, uploadFile);
            // get 요청 보내는 것~
        })
        .catch((error) => console.error(error));
}

function UploadFiletoS3(presignedUrl: string, uploadFile: File) {
    axios
        .put(presignedUrl, uploadFile, {
            headers: {
                'Content-Type': 'video/mp4',
            },
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
}
