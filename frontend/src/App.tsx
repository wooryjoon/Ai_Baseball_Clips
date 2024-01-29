import '@/styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Video from './pages/Video';
import UploadVideo from './pages/Video/UploadVideo';
import Login from './pages/Login';
import VideoResultPage from './pages/VideoResultPage';
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
                        <Route path="/result" element={<VideoResultPage />} />
                    </Routes>
                </BrowserRouter>
            </section>
        </>
    );
}

export default App;
