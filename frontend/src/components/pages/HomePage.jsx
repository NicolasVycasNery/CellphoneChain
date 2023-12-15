import React from 'react';
import { Link } from 'react-router-dom';


export function HomePage() {
    return (
        <div className="text-white p-8 flex flex-col">
            <h1 className="text-4xl mb-4">Cellphone Chain</h1>
            <div className="text-justify my-4">
                <p className="text-base">This is a DAPP demo for a cellphone registry system.</p>
                <p className="text-base">Phones a registered to a public blockchain address.</p>
                <p className="text-base">The owner of the phone can transfer ownership to another address.</p>
                <p className="text-base">Each address can only own 10 phones.</p>
                <p className="text-base text-orange-500">
                    Use the burger menu in the top left corner to navigate the demo.
                </p>
            </div>
            <div className="flex space-x-4">
                <Link to="/about-page" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    About
                </Link>
                <Link to="/my-phones-page" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    List Your Phones
                </Link>
                <Link to="/create-phone-page" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create Phone
                </Link>
            </div>
        </div>
    );
}
