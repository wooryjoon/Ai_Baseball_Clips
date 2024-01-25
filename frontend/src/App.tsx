import '@/styles/App.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Video from './pages/Video';
import InputPlayer from './pages/Video/InputPlayer';
import UploadVideo from './pages/Video/UploadVideo';

function App() {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
    return (
        <>
            <section className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        {/* <Route path="/login" element={<LogIn/>} /> */}
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/video" element={<Video />} />
                        <Route path="/inputplayer" element={<InputPlayer />} />
                        <Route path="/uploadvideo" element={<UploadVideo />} />
                    </Routes>
                </BrowserRouter>
            </section>
        </>
    );
}

export default App;
