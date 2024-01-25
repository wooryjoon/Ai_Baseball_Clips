import '@/styles/App.scss';

function App() {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);
    return (
        <>
            <section className="App"></section>
        </>
    );
}

export default App;
