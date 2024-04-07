import { useState } from "react"

export const useForm = (initialObj = {}) => {
    const [form, setForm] = useState(initialObj);
    let changed = ({ target }) => {
        let { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    }
    return { form, setForm, changed };
}
