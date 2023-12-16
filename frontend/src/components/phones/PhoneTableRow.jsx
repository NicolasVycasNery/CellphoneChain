export function PhoneTableRow({ phone }) {
    return (
        <tr className="bg-gray-700 text-white">
            <td className="bg-gray-800 text-white text-left px-4 py-2">{phone.id}</td>
            <td className="bg-gray-800 text-white text-left px-4 py-2">{phone.model}</td>
            <td className="bg-gray-800 text-white text-left px-4 py-2">{phone.manufacturer}</td>
            <td className="bg-gray-800 text-white text-left px-4 py-2">{phone.price}</td>
        </tr>
    )
}
