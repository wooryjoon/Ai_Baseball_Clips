import '@/styles/App.scss';
import SignUp from './pages/SignUp';
function App() {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
    return (
        <>
            <section className="App">
                <SignUp />
            </section>
        </>
    );
}

export default App;
