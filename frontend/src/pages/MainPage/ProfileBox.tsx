import Button from '@/components/Button';
import { Link } from 'react-router-dom';

export default function ProfileBox() {
    return (
        <div className="profileBox">
            {/* 이런 식으로 할거면 프로필 이미지 고르는 거, 구단별 일러스트로 하는 거 어떤지.. 
                좋아하는 구단의 일러스트로 프로필 이미지 선택,,, 이거에 대해서는 추후에 생각 더 해보기
            */}
            <img src="" className="profileBox-photo" alt="profile-image"></img>
            {/* <Link to="">
                <Button styleType="myPage"> 마이 페이지 이동 </Button>
            </Link> */}
        </div>
    );
}
