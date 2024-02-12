import InningDropDown from './InningDropDown';
import RGB from './RGB';
import TeamLogo from './TeamLogo';
import Score from './Score';
import { SelectedTeam } from './VideoResultOverview';
import { useQuery } from '@tanstack/react-query';
import { requestTeamInfo } from '@/api/requestReportView';

type ScoreBoard = {
    onClickInning: (inning: number) => void;
    onClickTeam: (e: React.MouseEvent<HTMLDivElement>) => void;
    currentTeam: SelectedTeam;
    currentInning: number;
};

export default function ScoreBoard({
    onClickInning,
    onClickTeam,
    currentTeam,
    currentInning,
}: ScoreBoard) {
    //TODO 팀 정보 조회
    const {
        data: teamData,
        isLoading,
        isError,
    } = useQuery({ queryFn: requestTeamInfo, queryKey: ['teamInfo'] });
    if (isLoading) return <div>isLoading</div>;
    if (teamData)
        return (
            <div className="scoreboard-container">
                <span className="scoreboard-container-title">SCORE</span>
                <InningDropDown inning={currentInning} onClick={onClickInning}></InningDropDown>
                <RGB />
                <div className="scoreboard">
                    <TeamLogo
                        currentTeam={currentTeam}
                        type="firstTeam"
                        onClick={onClickTeam}
                        img={teamData.data.firstTeamImageUrl}
                    >
                        {teamData.data.firstTeamName}
                    </TeamLogo>
                    <Score teamScore1={5} teamScore2={4} />
                    <TeamLogo
                        currentTeam={currentTeam}
                        type="secondTeam"
                        onClick={onClickTeam}
                        img={teamData.data.secondTeamImageUrl}
                    >
                        {teamData.data.secondTeamName}
                    </TeamLogo>
                </div>
                <RGB />
            </div>
        );
}
