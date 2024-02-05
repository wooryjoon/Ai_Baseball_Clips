import Button from '@/components/Button';
import Content from '@/components/Content';

export default function MyContent() {
    const mockData = {
        id: 1,
        title: '영상',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        poster: 'https://source.unsplash.com/random/?programming',
    };
    const onClickMyContentHandler = () => {
        console.log(123);
    };
    return (
        <div className="myContent">
            <Content clip={mockData} />
            <div className="myContent-info">
                <span>2024.01.02</span>
                <span>고우석 vs 이대호</span>
                <span>타석 1</span>
            </div>
            <Button styleType="myContent" onClick={onClickMyContentHandler}>
                제거
            </Button>
        </div>
    );
}
