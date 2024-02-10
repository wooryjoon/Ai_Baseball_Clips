import img from '@/assets/선수1.png';
type Props = {};

export default function TimeLinePlayer({}: Props) {
    return (
        <div className="timeline-item-player">
            <img src={img} alt="" />
            <span>이대호</span>
        </div>
    );
}
