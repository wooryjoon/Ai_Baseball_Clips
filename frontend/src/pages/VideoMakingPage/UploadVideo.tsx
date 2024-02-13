import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { upload } from '@/api/uploadVideoApis';
import { FileInfoType } from './type';
import fileExtensionValid, { ALLOW_FILE_EXTENTION } from '@/utils/fileExtensionValid';
import { openSSE, uploadResponse } from '@/api/sse';
import uploadVideo from '@/assets/Lottie/videoUpload.json';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

const UploadVideo = () => {
    const [inputFile, setInputFile] = useState<FileInfoType | null>(null);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        openSSE();
        setIsComplete(uploadResponse());

        if (isComplete) navigate('/loadingAI');
    }, [isComplete, navigate]);

    // console.log(isComplete);

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
            upload(inputFile.file);
        }
    };

    return (
        <div>
            <div id="upload-video">
                {!inputFile ? (
                    <>
                        <div className="animation-box">
                            <Lottie animationData={uploadVideo} />
                        </div>
                        <div>
                            <p className="description"> 편집을 원하는 동영상을 선택해주세요 </p>
                        </div>
                        <div className="buttons">
                            <label className="selectvideo" htmlFor="input-tag">
                                동영상 선택
                            </label>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="description-box">
                            <p className="description">영상 업로드 버튼을 눌러</p>
                            <p className="description">영상을 전송해주세요</p>
                        </div>
                        <div id="input-video-box">
                            {inputFile && <video src={inputFile?.url} controls width="350px" />}
                        </div>
                        <div className="buttons">
                            <label className="selectvideo" htmlFor="input-tag">
                                동영상 변경
                            </label>
                            <Button
                                styleType="uploadvideo"
                                onClick={inputFile && uploadFile}
                                disabled={!inputFile}
                            >
                                영상 업로드
                            </Button>
                        </div>
                    </>
                )}
                <input
                    id="input-tag"
                    type="file"
                    onChange={onChangeFile}
                    style={{ display: 'none' }}
                ></input>
            </div>
        </div>
    );
};

export default UploadVideo;
