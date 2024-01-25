import { useState } from 'react';
import axios from 'axios';
import './Test.scss';
import Button from '@/components/Button';

export default function Test() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedUrl, setSelectedUrl] = useState<any>();
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedUrl(URL.createObjectURL(event.target.files[0]));
        console.log(123);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            // Axios config
            let axiosConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            // 전송할 데이터 폼 생성
            const formData = new FormData();
            // Video 담기
            formData.append('video', selectedFile);
            for (const x of formData) {
                console.log(x);
            }

            // Axios 요청
            try {
                await axios.post('url', formData, axiosConfig);
                alert('요청 완료');
            } catch {
                alert('에러');
            }
        }
    };
    return (
        <div className="test">
            <input
                type="file"
                id="imgUpload"
                onChange={handleFileChange}
                style={{ visibility: 'hidden' }}
            />
            <label htmlFor="imgUpload" className="label">
                경기 영상 업로드
            </label>
            <Button onClick={handleUpload}>영상 추출하기</Button>
            <video src={selectedUrl} />
        </div>
    );
}
