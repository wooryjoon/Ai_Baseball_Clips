import Header from '@/components/Header';
import './MyPage.scss';
import ProfileMyPage from './ProfileMyPage';
export default function MyPage() {
    const onClickModifyHandler = () => {};
    return (
        <>
            <Header />
            {/* Profile Container */}
            <ProfileMyPage />
            {/* BookmarkList */}
            <BookMarkList />
        </>
    );
}
