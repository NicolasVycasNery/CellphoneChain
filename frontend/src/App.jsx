import {
    HashRouter
} from 'react-router-dom'
import { AppRouter } from './AppRouter'
import { Footer } from './components/UI/Footer'
import { Header } from './components/UI/Header'
import { MenuUI } from './components/UI/MenuUI'

function App() {

    return (
        <>
            <HashRouter basename="/">
                <MenuUI />
                <main id="main" className='min-h-screen flex flex-col justify-between bg-gray-900'>
                    <Header />
                    <AppRouter />
                    <Footer />
                </main>
            </HashRouter>
        </>
    )
}

export default App
