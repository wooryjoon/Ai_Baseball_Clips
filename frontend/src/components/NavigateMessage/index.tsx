import './NavigateMessage.scss';

type Props = {
    textMessage: string;
    linkMessage: string;
};
export default function NavigateMessage({ textMessage, linkMessage }: Props) {
    return (
        <div className="navigate-message">
            {textMessage} <a>{linkMessage}</a>
        </div>
    );
}
