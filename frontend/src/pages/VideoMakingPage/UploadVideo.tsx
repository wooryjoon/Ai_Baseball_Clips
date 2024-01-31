import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { requestPresignedUrl } from "@/api/uploadVideoApis";
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
                console.log(inputFile.url);
                formData.append("video", inputFile.file);
            }
            
        } else{
            alert("유효하지 않은 형식입니다.");
        }
    }

    const uploadFile = () => {
        if(!inputFile || !formData) return;
        requestPresignedUrl(inputFile.file, formData);
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