import { useEffect, useState } from "react";
import { getPhonesPage } from "../../services/web3";
import { PhoneTableRow } from "./PhoneTableRows";
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
    }, [page, pageSize]);

    return (
        <table className="table-auto">
            <PhoneTableHeader />
            <tbody>
                <PhoneTableRow />
            </tbody>
        </table>
    )
}
