import './VideoReport.scss';
import VideoReportScoreBoard from './VideoReportScoreBoard';

import PositionMap from './PositionMap';
export default function VideoReport() {
    return (
        <div className="videoReport-container">
            {/* 팀간 스코어 */}
            <h1 className="title">SCORE</h1>
            <div className="videoReport-score-container">
                <VideoReportScoreBoard />
            </div>
            {/* 팀 별 포지션 canvas */}
            <h1 className="title">LINE-UP</h1>
            <div className="videoReport-position-container">
                <div className="videoReport-positionMap-container">
                    <span>KT위즈</span>
                    <PositionMap />
                </div>

                <div className="videoReport-positionMap-container">
                    <span>LG트윈스</span>
                    <PositionMap />
                </div>
            </div>
        </div>
    );
}
