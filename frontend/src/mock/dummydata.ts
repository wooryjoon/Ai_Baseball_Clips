import { PlayerHighlightClips, Clip } from '@/pages/VideoResultPage/type';

const clipData = Array.from(Array(1000).keys()).map(
    (id): PlayerHighlightClips => ({
        id,
        player: '선수' + id,
        videoList: Array.from(Array(10).keys()).map(
            (id): Clip => ({
                id,
                title: '영상' + id,
                url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                poster: 'https://source.unsplash.com/random/?programming',
            })
        ),
    })
);
export { clipData };
