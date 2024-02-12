import overviewPageQuery from '@/api/requestReportView';
import PositionMap from './PositionMap';
import TimeLine from './TimeLine';
import './VideoReport.scss';
import VideoReportScoreBoard from './VideoReportScoreBoard';

export default function VideoReport() {
    const { data, isLoading, isError } = overviewPageQuery();

    if (isLoading) return <div>loading</div>;
    if (isError) return <div>error</div>;
    if (data.teamInfo && data.lineUp && data.timeLine) {
        return (
            <div className="videoReport-container">
                {/* 팀간 스코어 */}
                <h1 className="title">SCORE</h1>
                <div className="videoReport-score-container">
                    <VideoReportScoreBoard teamInfo={data.teamInfo} />
                </div>
                {/* 팀 별 포지션 canvas */}
                <h1 className="title">LINE-UP</h1>
                <div className="videoReport-position-container">
                    <div className="videoReport-positionMap-container">
                        <span>{data.teamInfo.firstTeamName}</span>
                        <PositionMap lineUp={data.lineUp.firstTeam} />
                    </div>

                    <div className="videoReport-positionMap-container">
                        <span>{data.teamInfo.secondTeamName}</span>
                        <PositionMap lineUp={data.lineUp.secondTeam} />
                    </div>
                </div>
                <h1 className="title">타임라인</h1>
                <div className="videoReport-timeline-container">
                    <TimeLine timeLine={data.timeLine} />
                </div>
            </div>
        );
    }
}
