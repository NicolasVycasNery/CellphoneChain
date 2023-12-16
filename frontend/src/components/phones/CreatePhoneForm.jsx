import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { createPhone } from "../../services/web3";
import { redirect } from "react-router-dom";
export function CreatePhoneForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            model: '',
            brand: '',
            price: 1,
        }
    })

    async function onSubmit(data) {
        const { model, brand, price } = data;
        console.log(model, brand, price);
        try {
            const hash = createPhone(model, brand, price);
            Swal.fire({
                title: 'Success!',
                text: `Phone ${model} created with the transaction hash ${hash}`,
                icon: 'success',
                confirmButtonText: 'Ok',
                allowOutsideClick: false,
                allowEscapeKey: false,
                onClose: () => {
                    // redirect to my-phones-page
                    redirect('/my-phones-page');
                }
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


    return (<form onSubmit={handleSubmit(onSubmit)}
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
            <select
                name="brand"
                id="brand"
                className="text-black bg-gray-200 p-2 rounded shadow-lg"
                {...register('brand', {
                    required: true,
                })}
            >
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
        <button
            className="cursor-pointer my-5 bg-green-500 hover:bg-green-400 p-2 rounded shadow-lg"
            type="submit">Create</button>
    </form>)
}
