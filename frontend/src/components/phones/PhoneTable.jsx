import { useEffect, useState } from "react";
import { getPhonesPage } from "../../services/web3";
import { PhoneTableRow } from "./PhoneTableRow";
import { PhoneTableHeader } from "./PhoneTableHeader";

export function PhoneTable({ page, limit }) {
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
    }, [page, limit]);

    return (<>
        {phones.length === 0 && (<h1 className="text-white text-2xl text-center col-span-3">
            No phones found.
        </h1>)}
        {phones.length > 0 && (
            <table className="table-auto">
                <PhoneTableHeader />
                <tbody>
                    {phones.map((phone, index) => {
                        return (
                            <PhoneTableRow key={phone.id} phone={phone} index={index} />
                        )
                    })}
                </tbody>
            </table>
        )}
    </>)
}
