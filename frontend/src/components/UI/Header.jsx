import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { useState } from 'react';

function BurgerIcon({
    width = "24px",
    height = "24px",
}) {
    return (
        <div style={{
            width,
            height,
            background: 'transparent',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
            }} >
                <span style={{
                    display: 'block',
                    width: '100%',
                    height: '25%',
                    background: 'white',
                    borderRadius: '2px'
                }} className="bg-white block" />
                <span style={{
                    display: 'block',
                    width: '100%',
                    height: '25%',
                    background: 'white',
                    borderRadius: '2px'
                }} className="bg-white block" />
                <span style={{
                    display: 'block',
                    width: '100%',
                    height: '25%',
                    background: 'white',
                    borderRadius: '2px'
                }} className="bg-white block" />
            </div>

        </div>
    );
}

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="bg-gray-800 text-white p-4 shadow-lg sticky top-0 z-10">
            <div className="flex justify-between">
            <div className="flex justify-between flex-col">
                <h1 className="text-2xl">
                    Cellphone Chain
                </h1>
                <h2 className="text-lg">
                    DAPP Demo
                </h2>
            </div>
            <div className="flex justify-between m-2">
                <BurgerIcon />
            </div>
            </div>

        </header>
    );
}

export { Header };

/**
<Menu className='bg-gray-800 text-white' pageWrapId={"pushRotate"} disableOverlayClick isOpen={menuOpen} onStateChange={(state) => { }}>
                <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/">Home</Link>
                <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/about-page">About</Link>
                <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/my-phones-page">My Phones</Link>
                <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/create-phone-page">Create Phone</Link>
                <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/phone-list-page">Phone List</Link>
                <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/phones-page">Phones</Link>
                <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/phone-table-page">Phone Table</Link>
                <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/edit-phone-page">Edit Phone</Link>
                <Link className="bg-gray-700 hover:bg-gray-600 p-2 border-b border-gray-800" to="/transfer-phone-page">Transfer Phone</Link>
            </Menu>
 */