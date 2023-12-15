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
        <section className="grid grid-cols-3 gap-4">
            {phones.map(phone => (
                <PhoneCard key={phone.id} phone={phone} isOwner={true} />
            ))}
        </section>
    )
}
