import Button from "@/components/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";

export default function UploadVideo(){
    const navigate = useNavigate();

    // const [showAlert, setShowAlert] = useState(false);
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(File);
    const [myBucket, setMyBucket] = useState({});

    // 최초로 딱 1번만 호출 -> 근데 이거 나중에 백엔드에서 처리해줘야 안전함 (암호키가 들어있으니까!)
    useEffect(() => {
        // 1. AWS 키 설정
        AWS.config.update({
            accessKeyId: import.meta.env.VITE_TEST_S3_ACCESSKEY,
            secretAccessKey: import.meta.env.VITE_TEST_S3_SECRETACCESSKEY,
        })

        // 2. AWS S3 객체 생성
        const myBucket = new AWS.S3({
            params: {Bucket: import.meta.env.VITE_TEST_BUCKETNAME},
            region: "ap-northeast-2" // 서울 지역 코드

        })

        setMyBucket(myBucket);
    })

    // 로컬에 있는 파일 가져오기
    const handleFileInput = (e: any) => {
        const file = e.target.files[0];
        // 파일 형식 제한 알림창
        const fileExt = file.name.split('.').pop();
        if(file.type !== 'image/jpeg' || fileExt !== 'jpg'){
            alert('jpg 파일만 업로드 가능합니다.');
            return;
        }
        setProgress(0);
        setSelectedFile(e.target.files[0]);
    }

    // 로컬 파일을 S3로 전송하기
    const uploadFile = (file: File) => {
        const param = {
            ACL: "public-read",
            ContentType: "image/jpeg",
            Body: file,
            Bucket: "testoree",
            Key: "upload/" + file.name,  // 보통은 file.name 중복 이슈 때문에 잘 안 쓰고, UUID + 파일명 저장 후 DB에 저장
        };

        myBucket
            .putObject(param)

            // .on("httpUploadProgress", (e: any) => { // loading percentage 확인
            //     setProgress(Math.round((e.loaded / e.total) * 100))
            //     setShowAlert(true);
            //     setTimeout(()=>{
            //         setShowAlert(false);
            //         setSelectedFile(null);
            //     }, 3000)

            //     // const percentProgress = Math.round((progress.loded / progress.total) * 100);
            //     // console.log("percentProgress: ", percentProgress);
            // })
            .send((error: any) => { // putObject, send 만 해도 파일이 저장됨
                if(error){
                    console.log(error);
                } else {
                    const url = myBucket.getSignedUrl("getObject", {Key: param.Key});
                    console.log("url: ", url);
                }
            })
    }


    return (
        <div id="upload-video">
            <div>
                <p className="description"> 편집을 원하는 동영상을 첨부해주세요. </p>

                <input type="file" onChange={handleFileInput}></input>
                <Button styleType="previous" onClick={() => navigate(-1)}>이전으로</Button>
                <Button styleType="uploadvideo" onClick={() => uploadFile(selectedFile)}> 동영상 업로드</Button>

            </div>
        </div>
    );
}