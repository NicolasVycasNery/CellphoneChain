import { useEffect, } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getPhone, updatePhone } from "../../services/web3";

export function EditPhoneForm({ id }) {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            id: 0,
            model: '',
            brand: '',
            price: 1,
        }
    })

    async function onSubmit(data) {
        const { id, model, brand, price } = data;
        try {
            const hash = updatePhone(id, model, brand, price);
            Swal.fire({
                title: 'Success!',
                text: `Phone ${model} created with the transaction hash ${hash}`,
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

    const brands = [
        "Apple",
        "Samsung",
        "Huawei",
        "Xiaomi",
        "Oppo",
        "Vivo",
        "Realme",
        "OnePlus",
        "Google",
        "Sony",
        "Nokia",
        "Motorola",
        "LG",
        "HTC",
        "Lenovo",
        "Asus"
    ]

    // shuffle brands
    brands.sort(() => Math.random() - 0.5);

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 text-white bg-gray-800 p-4 rounded shadow-lg">
            <div className="flex flex-col">
                <label htmlFor="model">
                    Model
                </label>
                {errors.model && <span className="text-red-500">
                    This field is required and must be at least 2 characters long
                </span>}
                <input
                    type="text"
                    name="model"
                    id="model"
                    {...register('model', {
                        required: true,
                        minLength: 2,
                        pattern: /^[A-Z]+$/i,
                    })}
                    className="text-black bg-gray-200 p-2 rounded shadow-lg"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="brand">
                    Brand
                </label>
                {errors.brand && <span className="text-red-500">
                    This field is required
                </span>}
                <select name="brand" id="brand" className="text-black bg-gray-200 p-2 rounded shadow-lg">
                    {brands.map((brand, index) => (
                        <option key={index} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="price">
                    Price
                </label>
                {errors.price && <span className="text-red-500">
                    This field is required and must be a number between 1 and 1000000
                </span>}
                <input
                    className="text-black bg-gray-200 p-2 rounded shadow-lg"
                    type="number"
                    name="price"
                    id="price"
                    {...register('price', {
                        required: true,
                        min: 1,
                        max: 1000000,
                    })}
                />
            </div>
            <div className="flex flex-row gap-2">
                <button
                    className="cursor-pointer my-5 bg-green-500 hover:bg-green-400 p-2 rounded shadow-lg"
                    type="submit">
                    Edit
                </button>
                <Link
                    className="cursor-pointer my-5 bg-red-500 hover:bg-red-400 p-2 rounded shadow-lg"
                    to={`/my-phones-page`}
                >
                    Cancel
                </Link>
            </div>
        </form>
    )
}