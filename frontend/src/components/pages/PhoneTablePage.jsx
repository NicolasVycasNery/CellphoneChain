export function PhoneTablePage() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    return (
        <section className="flex flex-col items-center">
            <h1 className="text-2xl text-white my-5">Phone Table</h1>
            <div className="flex flex-row gap-2">
                <div>
                    <label htmlFor="page">Page</label>
                    <input
                        type="number"
                        name="page"
                        id="page"
                        value={page}
                        onChange={(e) => setPage(e.target.value)}
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
            <PhoneTable page={page} limit={pageSize} />
        </section>
    )
}
