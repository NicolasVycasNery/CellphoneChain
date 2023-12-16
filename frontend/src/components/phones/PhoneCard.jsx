import { Link } from 'react-router-dom';
import { deletePhone } from '../../services/web3';
import Swal from "sweetalert2";

export function PhoneCard({ phone, isOwner = false }) {

    const { model, brand, price, id } = phone;
    
    async function handleDelete(e) {
        e.preventDefault();
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: `You will delete the phone ${model}, this action is irreversible!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });
        if (!confirm.isConfirmed) {
            Swal.fire({
                title: 'Cancelled!',
                text: `Nothing was deleted`,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            return;
        }
        try {
            const hash = await deletePhone(id);
            Swal.fire({
                title: 'Success!',
                text: `Phone ${model} deleted with the transaction hash ${hash}`,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        } catch (e) {
            Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }
    
    return (
        <div className="flex flex-col gap-2 text-white bg-gray-800 p-4 rounded shadow-lg">
            <p>ID:
                <span className="text-green-500">
                    {id}
                </span>
            </p>
            <p>Model: {model}</p>
            <p>Brand: {brand}</p>
            <p>Price: {price}</p>
            {
                isOwner && (
                    <div className="flex flex-row gap-2">
                        <Link
                            to={`/edit-phone-page?id=${id}`}
                            className="bg-green-500 p-2 rounded shadow-lg">
                            Edit
                        </Link>
                        <button onClick={handleDelete} className="bg-red-500 p-2 rounded shadow-lg">Delete</button>
                    </div>
                )
            }
        </div>
    )
}
