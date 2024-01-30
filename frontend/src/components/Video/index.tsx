import './Video.scss';

export default function Video({ link }: any) {
    return (
        <div className="video-container">
            <video src={link} className="video"></video>
        </div>
    );
}
