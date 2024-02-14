import { memo } from 'react';

type Props = {};

function RGB({}: Props) {
    return (
        <div className="RGB">
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
export default memo(RGB);
