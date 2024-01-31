import axios from "axios";

export function requestPresignedUrl(uploadFile: File, formData: FormData){
    axios.post('/presigned-url', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("accessToken"),
        },
    })
    .then(response => {
        const presignedUrl = response.data;
        console.log(presignedUrl);
        UploadFiletoS3(presignedUrl, uploadFile);
    })
    .catch(error => console.error(error));
}


export function UploadFiletoS3(presignedUrl: string, uploadFile: File){
    axios.put(presignedUrl, uploadFile, {
        headers: {
            "Content-Type": "video/mp4",
        },
    })
        .then(response => console.log(response))
        .catch(error => console.log(error));
}