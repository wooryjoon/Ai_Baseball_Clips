import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

// 조건 달아서, 입력 값이 > 0 이면 다음으로 가능 !  아니면 선수를 입력해달라는 모달창
export default function InputPlayer(){
    const navigate = useNavigate();

    const onCancel = () => {
        navigate(-1);
    }

    return(
        <div id="input-player">
            <p className="description"> 이제, 원하는 선수를 입력해주세요. </p>

            <form >
                <input name="name" placeholder=" 선수 이름"></input>
            </form>
                <Button styleType="previous" onClick={onCancel}>이전으로</Button>
                <Button styleType="next">다음으로</Button>
        </div>
    );
}