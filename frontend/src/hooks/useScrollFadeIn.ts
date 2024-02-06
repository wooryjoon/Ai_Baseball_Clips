import { ScrollFadeInProps } from '@/pages/MainPage/type';
import { useCallback, useRef, useEffect, CSSProperties } from 'react';

const useScrollFadeIn = ({
    direction = 'down',
    duration = 1,
    delay = 0,
}: ScrollFadeInProps = {}) => {
    const dom = useRef<HTMLDivElement>(null);

    const handleDirection = (direction: string): string => {
        switch (direction) {
            case 'up':
                return 'translated3d(0, 50%, 0)';
            case 'down':
                return 'translated3d(0, -50%, 0)';
            default:
                return '';
        }
    };

    const handleScroll = useCallback(
        ([entry]: IntersectionObserverEntry[]) => {
            const { current }: any = dom;

            if (current && entry.isIntersecting) {
                current.style.transitionProperty = 'all';
                current.style.transitionDuration = `${duration}s`;
                current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
                current.style.transitionDelay = `${delay}s`;
                current.style.opacity = '1';
                current.style.transform = 'translated3d(0, 0, 0)';
            }
        },
        [delay, duration]
    );

    useEffect(() => {
        let observer: IntersectionObserver;
        const { current } = dom;

        if (current) {
            observer = new IntersectionObserver(handleScroll, { threshold: 0.4 });
            observer.observe(current);
        }
        return () => observer && observer.disconnect();
    }, [handleScroll]);

    return {
        ref: dom,
        style: {
            opacity: 0,
            transform: handleDirection(direction),
        } as CSSProperties,
    };
};

export default useScrollFadeIn;
