import './BackDrop.scss';
type BackDrop = {
    children: React.ReactNode;
};
export default function BackDrop({ children }: BackDrop) {
    return <div className="backDrop">{children}</div>;
}
