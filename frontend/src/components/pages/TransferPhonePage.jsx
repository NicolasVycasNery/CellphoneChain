import React from 'react';
import { useParams } from 'react-router-dom';
import { TransferPhoneForm } from '../phones/TransferPhoneForm';

export function TransferPhonePage() {
    const { id } = useParams();
    return (
        <section className="flex flex-col items-center">
            <h1 className="text-2xl text-white my-5">Transfer Phone</h1>
            <TransferPhoneForm id={id} />
        </section>)
}
