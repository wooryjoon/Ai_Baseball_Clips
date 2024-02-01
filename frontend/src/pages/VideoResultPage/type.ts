export interface Clip {
    id: number;
    title: string;
    url: string;
    poster: string;
}
export interface PlayerHighlightClips {
    id: number; // 선수 id
    player: string; // 선수 이름
    videoList: Clip[];
}

export interface PaginationResponse<T> {
    contents: T[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    isLastPage: boolean;
    isFirstPage: boolean;
}
