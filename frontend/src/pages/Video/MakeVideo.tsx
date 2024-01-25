import Button from "@/components/Button";
import { Link } from "react-router-dom";

// 동영상 제작 button 누르면 버튼요소에 display:none 주고 그 위치 인풋폼 만들어줘
export default function MakeVideo(){
    return (
        <div id="make-video">
            <p className="description"> 동영상을 제작하겠습니까? </p>
            <Link to="/inputplayer"><Button styleType="makevideo">동영상 만들기</Button></Link>
            
        </div>
    );
}