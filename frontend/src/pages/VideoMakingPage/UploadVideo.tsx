import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { UploadFiletoS3, requestPresignedUrl } from "@/api/uploadVideoApis";
import { FileInfoType } from "./type";

const UploadVideo = () => {
    const navigate = useNavigate();
    const [inputFile, setInputFile] = useState<FileInfoType>();
    const formData = new FormData();

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => { 
        e.preventDefault();
        const file = e.target.files;
        
        if(file && file[0].type === "video/mp4"){
            setInputFile({
                url: URL.createObjectURL(file[0]),
                file: file[0],
            });

            if(inputFile){
                console.log(inputFile.file.name);
                formData.append("video", inputFile.file);
            }

        } else{
            alert("유효하지 않은 형식입니다.");
        }
    }

    const uploadFile = () => {
        if(!inputFile || !formData) return;
        // requestPresignedUrl(inputFile.file, formData);
        UploadFiletoS3("https://a305-project-bucket.s3.ap-northeast-2.amazonaws.com/null/1/null?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240131T063619Z&X-Amz-SignedHeaders=host&X-Amz-Expires=59999&X-Amz-Credential=AKIA3FLDXCWKWW5EG2CJ%2F20240131%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=ee270d11c0a6836165adfbdb4bb2838d3e81e69453c4f0a6164d9f00ac4273dd", inputFile.file);
    }

    return (
        <div id="upload-video">
            <div>
                <p className="description"> 편집을 원하는 동영상을 첨부해주세요. </p>
                {/* {showImage} */}
                <input type="file" onChange={onChangeFile}></input>
                <Button styleType="previous" onClick={() => navigate(-1)}>이전으로</Button>
                <Button styleType="uploadvideo" onClick={uploadFile}> 완료</Button>
            </div>
        </div>
    );
}

export default UploadVideo;