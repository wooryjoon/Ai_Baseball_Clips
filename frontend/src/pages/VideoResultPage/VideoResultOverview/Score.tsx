type Props = {
    teamScore1: number;
    teamScore2: number;
};

export default function Score({ teamScore1, teamScore2 }: Props) {
    return (
        <div className="score">
            <span>{teamScore1}</span>
            <span>{teamScore2}</span>
        </div>
    );
}
