import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { updatePhone, getPhone } from "../../services/web3";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function EditPhonePage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            id: 0,
            model: '',
            brand: '',
            price: 1,
        }
    })

    const { id } = useParams();

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
            setModel(phone.model);
            setBrand(phone.brand);
            setPrice(phone.price);
        }
        load();
    }, [id]);

    return (
        <section className="flex flex-col items-center">
            <h1 className="text-2xl text-white my-5">Edit Phone</h1>
            <form onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2 text-white bg-gray-800 p-4 rounded shadow-lg">
                <div className="flex flex-col">
                    <label htmlFor="model">
                        Model
                    </label>
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
                    <select name="brand" id="brand" className="text-black bg-gray-200 p-2 rounded shadow-lg">
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Huawei">Huawei</option>
                        <option value="Xiaomi">Xiaomi</option>
                        <option value="Oppo">Oppo</option>
                        <option value="Vivo">Vivo</option>
                        <option value="Realme">Realme</option>
                        <option value="OnePlus">OnePlus</option>
                        <option value="Google">Google</option>
                        <option value="Sony">Sony</option>
                        <option value="Nokia">Nokia</option>
                        <option value="Motorola">Motorola</option>
                        <option value="LG">LG</option>
                        <option value="HTC">HTC</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Asus">Asus</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price">
                        Price
                    </label>
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
        </section>
    )
}
