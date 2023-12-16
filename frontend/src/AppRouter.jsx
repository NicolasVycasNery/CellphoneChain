import {
    Route,
    Routes
} from 'react-router-dom'
import { CreatePhonePage } from './components/pages/CreatePhonePage'
import { EditPhonePage } from './components/pages/EditPhonePage'
import { HomePage } from './components/pages/HomePage'
import { MyPhonesPage } from './components/pages/MyPhonesPage'
import { PhoneFromPage } from './components/pages/PhoneFromPage'
import { PhoneListPage } from './components/pages/PhoneListPage'
import { PhoneTablePage } from './components/pages/PhoneTablePage'
import { TransferPhonePage } from './components/pages/TransferPhonePage'

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-phones-page" element={<MyPhonesPage />} />
            <Route path="/create-phone-page" element={<CreatePhonePage />} />
            <Route path="/phone-list-page" element={<PhoneListPage />} />
            <Route path="/phone-table-page" element={<PhoneTablePage />} />
            <Route path="/edit-phone-page" element={<EditPhonePage />} />
            <Route path="/transfer-phone-page" element={<TransferPhonePage />} />
            <Route path="/phone-from-page" element={<PhoneFromPage />} />
        </Routes>
    );
}
