import { useCallback, useEffect, useState } from 'react';
import PlayerVideoCard from './PlayerVideoCard';
import { instance } from '@/api';
import { PlayerHighlightClips, PaginationResponse } from './type';

export default function PlayerHighlights() {
    const [clips, setClips] = useState<PlayerHighlightClips[]>([]);
    const [page, setPage] = useState(0);
    const [isFetching, setFetching] = useState(false);
    const [hasNextPage, setNextPage] = useState(true);
    let PAGE_SIZE = 5;

    const fetchClips = useCallback(async () => {
        const { data } = await instance.get<PaginationResponse<PlayerHighlightClips>>(
            '/clip/list',
            {
                params: { page, size: PAGE_SIZE },
            }
        );
        setClips(clips.concat(data.contents));
        setPage(data.pageNumber + 1);
        setNextPage(!data.isLastPage);
        setFetching(false);
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, offsetHeight } = document.documentElement;
            if (window.innerHeight + scrollTop >= offsetHeight) {
                setFetching(true);
            }
        };
        // 컴포넌트 마운트 시 맨 처음 페칭
        setFetching(true);
        // 스크롤 이벤트에 따라 fetching하는 이벤트 등록
        if (window) window.addEventListener('scroll', handleScroll);
        // 언마운트 될 때 이벤트리스너 삭제
        return () => {
            if (window) window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        if (isFetching && hasNextPage) fetchClips();
        else if (!hasNextPage) setFetching(false);
    }, [isFetching]);

    return (
        <>
            {clips.map((player_data) => {
                return <PlayerVideoCard key={player_data.id} playerData={player_data} />;
            })}
            {isFetching && <div>Loading...</div>}
        </>
    );
}
