import { Link } from 'react-router-dom';

type Props = {};

export default function Logo({}: Props) {
    return (
        <Link to={'/main'} className="logo-container">
            <div>
                <span className="upper">A</span>i
            </div>
            <div>
                <span className="upper">B</span>aseball
            </div>
            <div>
                <span className="upper">C</span>lips
            </div>
        </Link>
    );
}
