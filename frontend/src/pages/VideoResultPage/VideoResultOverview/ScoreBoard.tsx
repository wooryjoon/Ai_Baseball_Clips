import InningDropDown from './InningDropDown';
import RGB from './RGB';
import TeamLogo from './TeamLogo';
import Score from './Score';

type Props = {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export default function ScoreBoard({ onClick }: Props) {
    return (
        <div className="scoreboard-container">
            <span className="scoreboard-container-title"> SCORE</span>
            <InningDropDown></InningDropDown>
            <RGB />
            <div className="scoreboard">
                <TeamLogo type="team1" onClick={onClick} img="/src/assets/BaseBallTeam/KT.png">
                    KT위즈
                </TeamLogo>
                <Score teamScore1={5} teamScore2={4} />
                <TeamLogo type="team2" onClick={onClick} img="/src/assets/BaseBallTeam/LG.png">
                    LG트윈스
                </TeamLogo>
            </div>
            <RGB />
        </div>
    );
}
