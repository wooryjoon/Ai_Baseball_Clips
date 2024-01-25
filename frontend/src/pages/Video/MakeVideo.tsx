import Button from "@/components/Button";
import { Link } from "react-router-dom";

export default function MakeVideo(){
    return (
        <div id="make-video">
            <p className="description"> 동영상을 제작하겠습니까? </p>
            <Link to="/uploadvideo"><Button styleType="makevideo">동영상 만들기</Button></Link>
            
        </div>
    );
}