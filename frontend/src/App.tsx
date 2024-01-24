import '@/styles/App.scss';
import Test from './pages/Test';
import Header from '@/components/Header';
function App() {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
    return (
        <>
            <section className="App">
                <Header />
                <Test />
            </section>
        </>
    );
}

export default App;
