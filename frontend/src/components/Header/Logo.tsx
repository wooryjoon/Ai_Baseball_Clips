import { memo } from 'react';
import { Link } from 'react-router-dom';

type Props = {};

function Logo({}: Props) {
    return (
        <Link to={'/'} className="logo-container">
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
export default memo(Logo);
