import InningDropDown from './InningDropDown';
import RGB from './RGB';
import TeamLogo from './TeamLogo';
import Score from './Score';
import { SelectedTeam } from '.';
import { TeamInfo } from '@/api/type';

type ScoreBoard = {
    onClickInning: (inning: number) => void;
    onClickTeam: (e: React.MouseEvent<HTMLDivElement>) => void;
    currentTeam: SelectedTeam;
    currentInning: number;
    teamData: TeamInfo;
};

export default function ScoreBoard({
    onClickInning,
    onClickTeam,
    currentTeam,
    currentInning,
    teamData,
}: ScoreBoard) {
    //TODO 팀 정보 조회

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
                    img={teamData.firstTeamImageUrl}
                >
                    {teamData.firstTeamName}
                </TeamLogo>
                <Score teamScore1={0} teamScore2={1} />
                <TeamLogo
                    currentTeam={currentTeam}
                    type="secondTeam"
                    onClick={onClickTeam}
                    img={teamData.secondTeamImageUrl}
                >
                    {teamData.secondTeamName}
                </TeamLogo>
            </div>
            <RGB />
        </div>
    );
}
