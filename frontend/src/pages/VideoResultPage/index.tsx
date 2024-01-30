import Header from '@/components/Header';
import './VideoResultPage.scss';
import { Link, Outlet } from 'react-router-dom';

export default function VideoResultPage() {
    return (
        <section className="videoResult-container">
            <Header />
            <nav className="video-navBar">
                <Link to="./players">선수별</Link>
                <Link to="./innings">회차별</Link>
                <Link to="./teams">구단별</Link>
            </nav>
            <section className="highlight-container">
                <Outlet></Outlet>
            </section>
        </section>
    );
}
