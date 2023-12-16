import { useEffect, useState } from "react";
import { getPhonesPage } from "../../services/web3";
import { PhoneCard } from "./PhoneCard";

export function PhoneList({ page, limit, isOwner = false }) {
    const [phones, setPhones] = useState([]);
    async function load() {
        const phones = await getPhonesPage(page, limit);
        setPhones(phones);
    }

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        load();
    }, [page, pageSize]);

    return (
        <div className="grid grid-cols-3 gap-4 my-5 p-5">
            {phones.length === 0 && <p className="text-white">No phones found</p>}
            {phones.map((phone) => {
                return (
                    <PhoneCard key={phone.id} phone={phone} isOwner={isOwner} />
                )
            })}
        </div>
    )
}
