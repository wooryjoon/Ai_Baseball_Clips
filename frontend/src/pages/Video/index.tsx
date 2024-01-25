import Header from "@/components/Header";
import MakeVideo from "./MakeVideo";
import './Video.scss';
import InputPlayer from "./InputPlayer";
import UploadVideo from "./UploadVideo";

// 동영상 만들기 버튼 클릭하면 -> 이벤트 발생 , 인풋 폼으로 넘겨
export default function Video(){
    return (
        <div>
            <Header/>
            <div id="animation-box"></div>
            <MakeVideo/>
            {/* <UploadVideo/> */}
        </div> 
    ); 
}