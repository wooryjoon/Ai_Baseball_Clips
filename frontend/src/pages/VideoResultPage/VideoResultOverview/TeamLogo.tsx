type TeamLogo = {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    children: string;
    img: string;
    type: 'firstTeam' | 'secondTeam';
    currentTeam: 'firstTeam' | 'secondTeam';
};

export default function TeamLogo({ type, onClick, children, img, currentTeam }: TeamLogo) {
    let className = 'team-card' + ` ${type}`;
    if (currentTeam === type) className = className + ' currentTeam';
    return (
        <div className={className} onClick={onClick}>
            <img src={img} alt="" />
            {children}
        </div>
    );
}
