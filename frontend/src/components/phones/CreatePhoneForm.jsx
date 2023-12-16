import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { createPhone } from "../../services/web3";

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
        try {
            const hash = createPhone(model, brand, price);
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
    return (<form onSubmit={handleSubmit(onSubmit)}
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
                <option value="Vivo">Vivo</option>
                <option value="OnePlus">OnePlus</option>
                <option value="Google">Google</option>
                <option value="Sony">Sony</option>
                <option value="Nokia">Nokia</option>
                <option value="Motorola">Motorola</option>
                <option value="LG">LG</option>
                <option value="HTC">HTC</option>
                <option value="Lenovo">Lenovo</option>
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
        <button
            className="cursor-pointer my-5 bg-green-500 hover:bg-green-400 p-2 rounded shadow-lg"
            type="submit">Create</button>
    </form>)
}
