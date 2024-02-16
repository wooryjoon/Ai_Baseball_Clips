import { TeamInfo } from '@/api/type';
type VideoReportScoreBoard = {
    teamInfo: TeamInfo;
};
export default function VideoReportScoreBoard({ teamInfo }: VideoReportScoreBoard) {
    return (
        <div className="videoReport-score-box">
            <img src={teamInfo.firstTeamImageUrl} alt="" />
            <div className="score">5 : 5</div>
            <img src={teamInfo.secondTeamImageUrl} alt="" />
        </div>
    );
}
