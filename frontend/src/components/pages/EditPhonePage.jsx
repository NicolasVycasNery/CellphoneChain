import { useParams } from "react-router-dom";
import { EditPhoneForm } from '../phones/EditPhoneForm';

export function EditPhonePage() {
    const { id } = useParams();
    return (
        <section className="flex flex-col items-center">
            <h1 className="text-2xl text-white my-5">Edit Phone</h1>
            <EditPhoneForm id={id} />
        </section>
    )
}
