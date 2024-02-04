import Button from '@/components/Button';
import { Link } from 'react-router-dom';

export default function ProfileBox() {
    return (
        <div className="profileBox">
            <img src="" className="profileBox-photo" alt="profile-image"></img>
            <div className="profileBox-information">
                <p>nickname</p>
            </div>
            <Link to="">
                <Button styleType="myPage"> 마이 페이지로 이동 </Button>
            </Link>
        </div>
    );
}
