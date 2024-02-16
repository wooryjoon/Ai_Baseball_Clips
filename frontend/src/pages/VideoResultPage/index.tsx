import './VideoResultPage.scss';
import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';
import VideoNavBar from './VideoNavBar';
import { useSelector } from 'react-redux';
import AlertPage from './AlertPage';

export default function VideoResultPage() {
    const reqId = useSelector((state: any) => state.requestId.value);

    return (
        <>
            <Header />
            {reqId === 17 ? (
                <section className="videoResult-container">
                    <VideoNavBar />
                    <section className="highlight-container">
                        <Outlet></Outlet>
                    </section>
                </section>
            ) : (
                <AlertPage />
            )}
        </>
    );
}
