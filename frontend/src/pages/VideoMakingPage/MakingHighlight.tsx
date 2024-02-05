import Button from '@/components/Button';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

export default function MakingHighlight() {
    return (
        <div>
            <Header />
            <div>
                {/* 동영상 제작 퍼센테이지에 따라 다른 텍스트 보여주기 */}
                {/* <p> AI가 1회말에 들어섰어요  </p>  처럼 다른 문구 애니메이션 효과 줘가면서 보여주기*/}
                <p> AI가 동영상을 추출하고 있어요~ </p>
                {/* 여기에는 동영상 로딩 화면?! */}

                {/* 지금까지 추출된 데이터를 실시간으로 전달 받으면서 
                    동영상이 만들어지는 동안
                    경기 영상에 관련된 정보를 실시간으로 업데이트 해주는 느낌으로 보여주거나,
                    ex) 경기 영상 분석 진척도에 따른, 선수별 타율 ... 뽑을 수 있다면 ... / 아니면 진짜 광고판 ㄱ?
                */}

                <div className="waitingBox">
                    <p> 해당 영상에 등장하는 선수 이름 </p>
                    <p> 해당 영상에서 예상되는 선수의 타율 ... 이런 거 가능한? </p>
                    <p> 혹은 숫자 야구 미니 게임 ㅋ 나도 모르겠다 이제</p>
                </div>

                {/* 아래 버튼은 100% 가 되면 띄워주기 */}
                <Link to="/result">
                    <Button styleType="goHighlight">하이라이트 보러가기</Button>
                </Link>
            </div>
        </div>
    );
}
