import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getPhone, updatePhone } from "../../services/web3";

export function EditPhoneForm({ id }) {
    const [loadPhone, setLoadPhone] = useState(null);
    const navigate = useNavigate();
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
            const hash = await updatePhone(id, model, brand, price);
            await Swal.fire({
                title: 'Success!',
                text: `Phone ${model} updated with hash ${hash}`,
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
            console.log(phone);
            const data = {
                id: _id,
                model,
                brand,
                price: parseInt(price)
            }
            setLoadPhone(data);
            reset(data)
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
                <select name="brand" id="brand" className="text-black bg-gray-200 p-2 rounded shadow-lg"
                    {...register('brand', {
                        required: true,
                    })
                    }
                >
                    {brands.map((brand, index) => (
                        <option key={index} value={brand}>{brand}</option>
                    ))}
                    {loadPhone && <option value={loadPhone.brand} selected>{loadPhone.brand}</option>}
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
            <div className="flex flex-col">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    type="submit">
                    Edit
                </button>
                <Link
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center"
                    to={`/my-phones-page`}
                >
                    Cancel
                </Link>
            </div>
        </form>
    )
}