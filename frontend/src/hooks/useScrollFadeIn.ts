import { useCallback, useRef, useEffect } from 'react';

const useScrollFadeIn = (direction = 'up', duration = 1, delay = 0) => {
    const dom = useRef();

    const handleDirection = (name: string) => {
        switch (name) {
            case 'up':
                return 'translated3d(0, 50%, 0)';
            case 'down':
                return 'translated3d(0, -50%, 0)';
            case 'left':
                return 'translated3d(50%, 0, 0)';
            case 'right':
                return 'translated3d(-50%, 0, 0)';
            default:
                return;
        }
    };

    const handleScroll = useCallback(
        ([entry]: any) => {
            const { current } = dom;

            if (current && entry.isIntersecting) {
                current.style.transitionProperty = 'all';
                current.style.transitionDuration = `${duration}s`;
                current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
                current.style.transitionDelay = `${delay}s`;
                current.style.opacity = 1;
                current.style.transform = 'translated3d(0, 0, 0)';
            }
        },
        [delay, duration]
    );

    useEffect(() => {
        let observer: any;
        const { current } = dom;

        if (current) {
            observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
            observer.observe(current);
        }
        return () => observer && observer.disconnect();
    }, [handleScroll]);

    return {
        ref: dom,
        style: {
            opacity: 0,
            transform: handleDirection(direction),
        },
    };
};

export default useScrollFadeIn;
