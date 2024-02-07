import React, { useState } from 'react';
import Button from '@/components/Button';
import { requestPresignedUrl } from '@/api/uploadVideoApis';
import { FileInfoType } from './type';
import { Link } from 'react-router-dom';
import fileExtensionValid, { ALLOW_FILE_EXTENTION } from '@/utils/fileExtensionValid';

const UploadVideo = () => {
    const [inputFile, setInputFile] = useState<FileInfoType>();

    // Input Form 안의 값이 바뀔 때 일어나는 이벤트
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
    // Back 에게 PresignedURL 발급 요청 -> 응답 -> presignedURL 설정하여 S3 에 데이터 전송
    const uploadFile = () => {
        if (inputFile) requestPresignedUrl(inputFile.file);
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
                {/* axios 요청하면서 단계별로 -> useNavigate 로 페이지 넘기기, Link 지우고 */}
                <Link to="" onClick={nextHandler}>
                    <Button styleType="uploadvideo" onClick={inputFile && uploadFile}>
                        결과페이지로 이동
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default UploadVideo;
