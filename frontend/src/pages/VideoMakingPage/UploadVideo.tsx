import React, { useState } from 'react';
import Button from '@/components/Button';
import { upload } from '@/api/uploadVideoApis';
import { FileInfoType } from './type';
import { Link } from 'react-router-dom';
import fileExtensionValid, { ALLOW_FILE_EXTENTION } from '@/utils/fileExtensionValid';

const UploadVideo = () => {
    const [inputFile, setInputFile] = useState<FileInfoType | null>(null);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    // const [uploadProgress, setUploadProgress] = useState<number>(0);

    // Input 안의 값이 바뀔 때 일어나는 이벤트
    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const target = e.currentTarget;
        const file = e.target.files;

        if (file) {
            if (!fileExtensionValid(file[0])) {
                target.value = '';
                alert(`업로드 가능한 확장자가 아닙니다. 가능한 확장자: ${ALLOW_FILE_EXTENTION}`);
                return;
            }

            setInputFile({
                url: URL.createObjectURL(file[0]),
                file: file[0],
            });

            if (inputFile) {
                console.log(inputFile.file.name);
            }
        } else {
            alert('파일이 선택되지 않았습니다.');
            return;
        }
    };

    // 완료 버튼 누르면 S3 에 저장하기 위해
    // Back 에게 UploadId, PresignedURL 발급 요청 -> 응답 -> presignedURL 설정하여 S3 에 데이터 전송
    // 성공적으로 완료가 되면 true 반환
    const uploadFile = async () => {
        if (inputFile) {
            upload(inputFile.file).then((status) => {
                if (status) setIsComplete(true);
            });
        }
    };

    const nextHandler = (e: any) => {
        if (!inputFile) e.preventDefault();
    };

    return (
        <div id="upload-video">
            <p className="description"> 편집을 원하는 동영상을 첨부해주세요. </p>
            <div id="input-video-box">
                {inputFile && <video src={inputFile?.url} controls width="350px" />}
            </div>
            <div>
                <label className="input-tag-label" htmlFor="input-tag">
                    파일 선택
                </label>
                <input
                    id="input-tag"
                    type="file"
                    onChange={onChangeFile}
                    style={{ display: 'none' }}
                ></input>
            </div>
            <div className="buttons">
                <Button styleType="uploadvideo" onClick={inputFile && uploadFile}>
                    영상 업로드
                </Button>
                <Link to="/main" onClick={nextHandler}>
                    <Button styleType="gonext" disabled={!isComplete}>
                        결과페이지로 이동
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default UploadVideo;
