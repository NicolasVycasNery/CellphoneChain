import React from 'react'
import { CreatePhoneForm } from '../phones/CreatePhoneForm'

export function CreatePhonePage() {


    return (
        <section className="flex flex-col items-center">
            <h1 className="text-2xl text-white my-5">Create Phone</h1>
            <CreatePhoneForm />
        </section>
    )
}
