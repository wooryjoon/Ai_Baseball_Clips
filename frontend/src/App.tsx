import '@/styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import MakingVideo from './pages/VideoMakingPage';
import Login from './pages/Login';
import VideoResultPage from './pages/VideoResultPage';
import InningsHighlights from './pages/VideoResultPage/InningsHighlights';
import PlayerHighlights from './pages/VideoResultPage/PlayerHighLights';
import initMockAPI from './mock';
import MyPage from './pages/MyPage';
import MainPage from './pages/MainPage';

initMockAPI();

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
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/makingvideo" element={<MakingVideo />} />
                        <Route path="/mypage" element={<MyPage />} />
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
