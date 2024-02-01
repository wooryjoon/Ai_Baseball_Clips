import '@/styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import MakingVideo from './pages/VideoMakingPage';
import Login from './pages/Login';
import VideoResultPage from './pages/VideoResultPage';
import UploadVideo from './pages/VideoMakingPage/UploadVideo';
import Percentage from './pages/VideoMakingPage/Percentage';
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
                        <Route path="/makingvideo" element={<MakingVideo />} />
                        <Route path="/uploadvideo" element={<UploadVideo />} />
                        <Route path="/percentage" element={<Percentage/>} />
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
