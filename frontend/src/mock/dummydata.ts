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
const pos = ['1루수', '2루수', '3루수', '중견수', '좌익수', '우익수', '유격수', '포수', '지명타자'];
const overviewPlayData: any = Array.from(Array(9).keys()).map((id) => {
    return {
        id,
        player: '선수' + id,
        position: pos[id],
        clip: {
            id,
            title: '영상',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            poster: 'https://source.unsplash.com/random/?programming',
        },
    };
});
const overviewPlayData2: any = Array.from(Array(9).keys()).map((id) => {
    return {
        id,
        player: '선수' + id,
        position: pos[id],
        clip: {
            id,
            title: '영상',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            poster: 'https://source.unsplash.com/random/?programming',
        },
    };
});
const overviewPlayData3: any = Array.from(Array(9).keys()).map((id) => {
    return {
        id,
        player: '선수' + id,
        position: pos[id],
        clip: {
            id,
            title: '영상',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            poster: 'https://source.unsplash.com/random/?programming',
        },
    };
});
export { clipData, overviewPlayData, overviewPlayData2 };
