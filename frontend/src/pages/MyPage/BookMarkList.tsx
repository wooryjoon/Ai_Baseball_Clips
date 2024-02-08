import MyContent from './MyContent';

type Props = {};

export default function BookMarkList({}: Props) {
    const dummy = Array.from(Array(10).keys());
    return (
        <div className="bookmarkList">
            <div className="bookmark-title">
                내가 찜한 영상
                <img src="/src/assets/ball.png" alt="" />
            </div>
            <ul>
                {dummy.map(() => (
                    <MyContent />
                ))}
            </ul>
        </div>
    );
}
