import './VideoResultPage.scss';
import { Outlet } from 'react-router-dom';

import Header from '@/components/Header';
import VideoNavBar from './VideoNavBar';

export default function VideoResultPage() {
    return (
        <>
            <Header />
            <section className="videoResult-container">
                <VideoNavBar />
                <section className="highlight-container">
                    <Outlet></Outlet>
                </section>
            </section>
        </>
    );
}
