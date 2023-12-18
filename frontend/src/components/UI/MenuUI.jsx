import { pushRotate as Menu } from 'react-burger-menu';
import {
    Link
} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { menuState } from '../../store/BurgerMenuContext';

export function MenuUI() {
    const [isOpen, setIsOpen] = useRecoilState(menuState);
    return (
        <Menu className='bg-gray-800 text-white overflow-hidden'
            pageWrapId={"main"}
            isOpen={isOpen}
            onStateChange={(state) => { }}
            outerContainerId={"main"}
            animation="push"
            right
        >
            <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/">Home</Link>
            <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/my-phones-page">My Phones</Link>
            <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/create-phone-page">Create Phone</Link>
            <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/phone-list-page">Phone List</Link>
            <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/phone-table-page">Phone Table</Link>
        </Menu>
    )
}