import '@/styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Video from './pages/Video';
import UploadVideo from './pages/Video/UploadVideo';
import Login from './pages/Login';
import VideoResultPage from './pages/VideoResultPage';
import InningsHighlights from './pages/VideoResultPage/InningsHighlights';
import PlayerHighlights from './pages/VideoResultPage/PlayerHighLights';

function App() {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
    return (
        <>
            <section className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/video" element={<Video />} />
                        <Route path="/uploadvideo" element={<UploadVideo />} />
                        <Route path="/result" element={<VideoResultPage />}>
                            <Route path="players" element={<PlayerHighlights />} />
                            <Route path="innings" element={<InningsHighlights />} />
                            <Route path="teams" element={null} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </section>
        </>
    );
}

export default App;
