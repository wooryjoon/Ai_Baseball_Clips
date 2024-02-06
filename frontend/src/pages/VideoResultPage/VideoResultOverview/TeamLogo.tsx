type TeamLogo = {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    children: string;
    img: string;
    type: string;
};

export default function TeamLogo({ type, onClick, children, img }: TeamLogo) {
    let className = 'team-card' + ` ${type}`;
    return (
        <div className={className}>
            <img onClick={onClick} src={img} alt="" />
            {children}
        </div>
    );
}
