import './VideoResultPage.scss';
import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ColorPaltte from '@/styles/ColorPalette';
export default function VideoResultPage() {
    const location = useLocation();
    const current_endUrl = location.pathname.split('/').slice(-1)[0];

    return (
        <section className="videoResult-container">
            <nav className="video-navBar">
                <Link
                    to="./players"
                    style={{
                        color: current_endUrl === 'players' ? ColorPaltte.$kbo_darkblue : 'gray',
                    }}
                >
                    선수별
                </Link>
                <Link
                    to="./innings"
                    style={{
                        color: current_endUrl === 'innings' ? ColorPaltte.$kbo_darkblue : 'gray',
                    }}
                >
                    회차별
                </Link>
                <Link
                    to="./teams"
                    style={{
                        color: current_endUrl === 'teams' ? ColorPaltte.$kbo_darkblue : 'gray',
                    }}
                >
                    구단별
                </Link>
            </nav>
            <section className="highlight-container">
                <Outlet></Outlet>
            </section>
        </section>
    );
}
