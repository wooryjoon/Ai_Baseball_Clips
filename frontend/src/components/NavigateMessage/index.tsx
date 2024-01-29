import { Link } from 'react-router-dom';
import './NavigateMessage.scss';

type Props = {
    textMessage: string;
    linkMessage: string;
    type: string;
};
export default function NavigateMessage({ textMessage, linkMessage, type }: Props) {
    const link = `/${type}`;
    return (
        <div className="navigate-message">
            {textMessage} <Link to={link}>{linkMessage}</Link>
        </div>
    );
}
