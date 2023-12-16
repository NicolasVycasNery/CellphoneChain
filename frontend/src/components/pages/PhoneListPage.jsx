import { useState } from 'react';
import { PhoneList } from '../phones/PhoneList';


export function PhoneListPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);

    return (
        <section className="flex flex-col gap-2 align-top m-5">
            <h1 className="text-2xl text-white my-5">Phone List</h1>
            <div className="flex flex-row gap-2">
                <div>
                    <label className='text-white' htmlFor="page">Page:</label>
                    <input
                        type="number"
                        name="page"
                        id="page"
                        value={page}
                        onChange={(e) => {
                            // page cannot be less than 1
                            if (e.target.value < 1) {
                                setPage(1);
                            } else {
                                setPage(e.target.value);
                            }
                        }}
                        className="bg-gray-800 text-white rounded shadow-lg"
                    />
                </div>
                <div>
                    <select name="pageSize" id="pageSize" value={pageSize} onChange={(e) => setPageSize(e.target.value)} className="bg-gray-800 text-white rounded shadow-lg">
                        <option value="10">12</option>
                        <option value="20">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
            <PhoneList page={page} limit={pageSize} />
        </section>
    )
}
