import '@/styles/App.scss';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
function App() {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
    return (
        <>
            <section className="App">
                <Login />
            </section>
        </>
    );
}

export default App;
