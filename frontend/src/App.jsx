import {
    BrowserRouter,
    HashRouter,
    Route,
    Routes
} from 'react-router-dom'
import { Footer } from './components/UI/Footer'
import { Header } from './components/UI/Header'
import { AboutPage } from './components/pages/AboutPage'
import { CreatePhonePage } from './components/pages/CreatePhonePage'
import { EditPhonePage } from './components/pages/EditPhonePage'
import { HomePage } from './components/pages/HomePage'
import { MyPhonesPage } from './components/pages/MyPhonesPage'
import { PhoneFromPage } from './components/pages/PhoneFromPage'
import { PhoneListPage } from './components/pages/PhoneListPage'
import { PhoneTablePage } from './components/pages/PhoneTablePage'
import { PhonesPage } from './components/pages/PhonesPage'
import { TransferPhonePage } from './components/pages/TransferPhonePage'

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="about-page" element={<AboutPage />} />
            <Route path="my-phones-page" element={<MyPhonesPage />} />
            <Route path="create-phone-page" element={<CreatePhonePage />} />
            <Route path="phone-list-page" element={<PhoneListPage />} />
            <Route path="phones-page" element={<PhonesPage />} />
            <Route path="phone-table-page" element={<PhoneTablePage />} />
            <Route path="edit-phone-page" element={<EditPhonePage />} />
            <Route path="transfer-phone-page" element={<TransferPhonePage />} />
            <Route path="phone-from-page" element={<PhoneFromPage />} />
        </Routes>
    );
}

function App() {
    return (
        <>
            <HashRouter basename="/">
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
