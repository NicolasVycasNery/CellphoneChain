import { useEffect, useState } from "react";
import { getPhonesFromOwner } from "../../services/web3";
import { PhoneCard } from "../phones/PhoneCard";

export function MyPhonesPage() {
    const [phones, setPhones] = useState([]);
    useEffect(() => {
        async function load() {
            const phones = await getPhonesFromOwner(
                window.ethereum.selectedAddress
            );
            setPhones(phones);
        }
        load();
    }, []);
    return (
        <section className="grid grid-cols-3 gap-4 mt-4 mx-4">
            {
                phones.length === 0 && <h1 className="text-white text-2xl text-center col-span-3">
                    You have no phones.
                </h1>
            }
            {phones.map(phone => (
                <PhoneCard key={phone.id} phone={phone} isOwner={true} />
            ))}
        </section>
    )
}
