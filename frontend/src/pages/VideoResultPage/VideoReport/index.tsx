import reportPageQuery from '@/api/requestReportView';
import PositionMap from './PositionMap';
import TimeLine from './TimeLine';
import './VideoReport.scss';
import VideoReportScoreBoard from './VideoReportScoreBoard';
import Loading from '@/components/Loading';
import useGetRequestId from '@/hooks/useGetRequestId';

export default function VideoReport() {
    const reqId = useGetRequestId();
    const { data, isLoading, isError } = reportPageQuery(reqId);

    if (isLoading) return <Loading />;
    if (isError) return <div>error</div>;
    if (data.teamInfo && data.lineUp && data.timeLine) {
        console.log(data);
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
