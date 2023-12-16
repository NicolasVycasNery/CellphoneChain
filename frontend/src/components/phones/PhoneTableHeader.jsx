export function PhoneTableHeader({
    columnNames = ["ID", "Model", "Manufacturer", "Price"],
}) {
    return (
        <thead>
            <tr className="bg-gray-700 text-white">
                {columnNames.map((columnName) => (
                    <th
                        className="bg-gray-700 text-white text-left px-4 py-2"
                        key={columnName}>{columnName}</th>
                ))}
            </tr>
        </thead>
    )
}
