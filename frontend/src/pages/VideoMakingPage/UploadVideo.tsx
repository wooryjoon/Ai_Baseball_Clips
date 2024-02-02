import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { UploadFiletoS3, requestPresignedUrl } from "@/api/uploadVideoApis";
import { FileInfoType } from "./type";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

// 사용 가능한 확장자
const ALLOW_FILE_EXTENTION = "mp4,mov,wmv,avi,avchd,webm";

// 파일 확장자 검사
const fileExtensionValid = ({name} : {name: string}):boolean => {
    const extension = removeFileNmae(name);

    if(!(ALLOW_FILE_EXTENTION.indexOf(extension) > -1) || extension === ""){
        return false;
    }
    return true;
}

// 확장자만 리턴해주는 함수
const removeFileNmae = (originalFileName:string):string => {
    const lastIndex = originalFileName.lastIndexOf(".");
    if(lastIndex < 0) return "";
    return originalFileName.substring(lastIndex+1).toLowerCase();
}

const UploadVideo = () => {
    const navigate = useNavigate();
    const [inputFile, setInputFile] = useState<FileInfoType>();
    // const formData = new FormData();

    // Input Form 안의 값이 바뀔 때 일어나는 이벤트
    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => { 
        e.preventDefault();
        const target = e.currentTarget;
        const file = e.target.files;
        
        if(file){
            if(!fileExtensionValid(file[0])){
                target.value = '';
                alert(`업로드 가능한 확장자가 아닙니다. 가능한 확장자: ${ALLOW_FILE_EXTENTION}`);
                return;
            }

            setInputFile({
                url: URL.createObjectURL(file[0]),
                file: file[0],
            });

            if(inputFile){
                console.log(inputFile.file.name);
                // formData.append("video", inputFile.file);
            }

        } else {
            alert("파일이 선택되지 않았습니다.");
            return;
        }
    }

    // 완료 버튼 누르면 S3 에 저장하기 위해
    // Back 에게 PresignedURL 발급 요청 -> 응답 -> presignedURL 설정하여 S3 에 데이터 전송
    const uploadFile = () => {
        // requestPresignedUrl(inputFile.file);
        // UploadFiletoS3(presignedUrl, inputFile.file);
    }

    const nextHandler = (e: any) => {
        if(!inputFile) e.preventDefault();
    }

    return (
        <div >
            <Header/>
            <div id="upload-video">
                <p className="description"> 편집을 원하는 동영상을 첨부해주세요. </p>
                <div id="input-video-box">
                    {inputFile && <video src={inputFile?.url} controls width="350px" />}
                </div>
                <div>
                    <label className="input-tag-label" htmlFor="input-tag">파일 선택</label>
                    <input id="input-tag" type="file" onChange={onChangeFile} style={{display: "none"}}></input>
                </div>
                <div className="buttons">
                    <Button styleType="previous" onClick={() => navigate(-1)}>이전으로</Button>
                    <Link to="/percentage" onClick={nextHandler}><Button styleType="uploadvideo" onClick={inputFile && uploadFile}>다음으로</Button></Link>
                </div>
            </div>
        </div>
    );
}

export default UploadVideo;