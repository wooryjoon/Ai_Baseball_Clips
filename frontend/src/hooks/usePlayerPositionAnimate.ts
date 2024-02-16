import { useCallback, useEffect } from 'react';
import positionLocaiton from '@/utils/positionLocation';

function usePlayerPositionAnimate(
    playerCircleRef: React.RefObject<HTMLDivElement>,
    position: string
) {
    useEffect(() => {
        let keyframes = [
            {
                top: '40%',
                left: '44%',
            },
            {
                top: positionLocaiton[position].top + '%',
                left: positionLocaiton[position].left + '%',
            },
        ];
        let options: KeyframeAnimationOptions = {
            duration: 1500,
            easing: 'ease-in-out',
            fill: 'forwards',
            // fill: 'both',
        };

        const tick: number = setTimeout(() => {
            if (playerCircleRef.current) playerCircleRef.current.animate(keyframes, options);
        });

        return () => clearTimeout(tick);
    });
}
export default usePlayerPositionAnimate;
