import { Link } from 'react-router-dom';
import './NavigateMessage.scss';

type Props = {
    textMessage: string;
    linkMessage: string;
    type: string;
};
export default function NavigateMessage({ textMessage, linkMessage, type }: Props) {
    return (
        <div className="navigate-message">
            {textMessage} <Link to={`/${type}`}>{linkMessage}</Link>
        </div>
    );
}
