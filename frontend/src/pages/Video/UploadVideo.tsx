import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

export default function UploadVideo(){
    const navigate = useNavigate();

    return (
        <div id="upload-video">
            <div>
                <p className="description"> 편집을 원하는 동영상을 첨부해주세요. </p>
                <Button styleType="previous" onClick={() => navigate(-1)}>이전으로</Button>
                <Button styleType="uploadvideo"> 동영상 업로드</Button>
            </div>
        </div>
    );
}