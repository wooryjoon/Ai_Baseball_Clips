import { requestFavoriteVideoList } from '@/api/requestMyPage';
import MyContent from './MyContent';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Loading';
import baseballImg from '@/assets/ball.png';
import { FavoriteVideo } from '@/api/type';
import { useState } from 'react';

type Props = {};

export default function BookMarkList({}: Props) {
    const { data, isLoading, isError } = useQuery({
        queryFn: requestFavoriteVideoList,
        queryKey: ['FavoriteVideoList'],
    });
    if (isLoading) return <Loading />;
    if (data?.data) {
        const [favoriteVideoList, setFavoriteVideoList] = useState(data.data);
        const onClickMyContentHandler = (batId: number) => {
            //  찜요청 보내기
            requestFavorite({ batId: batId }).then(() => {
                setFavoriteVideoList(favoriteVideoList.filter((e) => e.batId != batId));
            });
        };

        return (
            <div className="bookmarkList">
                <div className="bookmark-title">
                    내가 찜한 영상
                    <img className="baseball" src={baseballImg} alt="" />
                </div>
                <ul>
                    {data.data.map((favoriteVideo: FavoriteVideo, i) => (
                        <MyContent
                            key={i}
                            favoriteVideo={favoriteVideo}
                            onClick={onClickMyContentHandler}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}
