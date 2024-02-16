import { useCallback, useEffect } from 'react';

function usePlayerCardAnimate(playerCircleRef: React.RefObject<HTMLDivElement>, timer: number) {
    useEffect(() => {
        let keyframes = [
            {
                opacity: 0,
                transform: 'translate3d(0, -100%, 0)',
            },
            {
                opacity: 1,
                transform: 'translateZ(0)',
            },
        ];
        let options: KeyframeAnimationOptions = {
            duration: 1000,
            easing: 'ease-in-out',
            fill: 'forwards',
        };

        const tick: number = setTimeout(() => {
            if (playerCircleRef.current) playerCircleRef.current.animate(keyframes, options);
        }, 1000 + timer);

        return () => clearTimeout(tick);
    }, []);
}
export default usePlayerCardAnimate;
