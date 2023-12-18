import { useEffect, } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getPhone, transferPhone } from "../../services/web3";

export function TransferPhoneForm({ id }) {
    const navigate = useNavigate();

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            address: '',
        }
    })

    async function onSubmit(data) {
        const { address } = data;
        try {
            const hash = await transferPhone(address,id);
            Swal.fire({
                title: 'Success!',
                text: `Phone ${id} transferred with the transaction hash ${hash}`,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            navigate('/my-phones-page');
        } catch (e) {
            Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    useEffect(() => {
        async function load() {
            const phone = await getPhone(id);
            const { id: _id, model, brand, price, owner } = phone;
            reset({
                id: _id,
                model,
                brand,
                price,
            })
        }
        load();
    }, [id]);

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 text-white bg-gray-800 p-4 rounded shadow-lg">
            <p className="text-lg font-bold">
                You are transferring the phone with id <span className="text-green-500">{id}</span>
            </p>
            <p className="text-lg font-bold">
                This action is <span className="text-red-500">irreversible</span>
            </p>
            <hr className="my-2" />
            <div className="flex flex-col">
                <label className="text-white">Address</label>
                <input
                    type="text"
                    className="text-black bg-gray-200 p-2 rounded shadow-lg"
                    placeholder="Address"
                    {...register("address", {
                        required: true,
                        pattern: /^0x[a-fA-F0-9]{40}$/i
                    })}
                />
                {errors.address && <span className="text-red-500">
                    This field is required and must be a valid address
                </span>}
            </div>
            <div className="flex flex-row gap-2">
                <button type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Transfer
                </button>
                <Link to="/my-phones-page"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center">
                    Cancel
                </Link>
            </div>
        </form>
    </>)
}