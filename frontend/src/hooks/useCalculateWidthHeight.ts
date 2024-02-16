import { RefObject, useEffect, useState } from 'react';

export default function useCalculateWidthHeight(ref: RefObject<HTMLElement>) {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        const setClientWidthHeight = () => {
            if (ref.current) {
                setWidth(ref.current.clientWidth);
                setHeight(ref.current.clientHeight);
            }
        };
        setClientWidthHeight();
    });

    return { width, height };
}
