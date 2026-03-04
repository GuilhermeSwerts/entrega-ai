import { GetFieldsRequireds, useGenericFormValidator } from "../../../globalHook/useGenericFormValidator"
import type { IDeliveryRequest } from "../../../interface/IDeliveryRequest"
import { GetAddress } from "../../../services/Address/Address"

export const useFormOrderSolicitation = () => {

    const initialForm: IDeliveryRequest = {
        numOrder: 0,
        zipCode: "",
        address: "",
        numberAddress: "",
        neighborhood: "",
        city: "",
        uf: "",
        complementAddress: "",
        longitude: 0,
        latitude: 0,
        idStatusDeliveryRequest: "3f9c2e4d-8b71-4a6a-9c3f-2d7e5f1a8b64",
        dtRegister: new Date().toISOString(),
        deliveryFee: 0,
        orderValue: 0,
        recipientName: "",
        recipientPhone: "",
        recipientEmail: "",
        deliveryRequestDetails: "",
        deliveryRequestObservation: "",
        idDeliveryRequest: "3f9c2e4d-8b71-4a6a-9c3f-2d7e5f1a8b64",
        idCustomer: "3f9c2e4d-8b71-4a6a-9c3f-2d7e5f1a8b64"
    }
    const rules = GetFieldsRequireds<IDeliveryRequest>([
        "numOrder",
        "zipCode",
        "address",
        "numberAddress",
        "neighborhood",
        "city",
        "uf",
        "deliveryFee",
        "orderValue",
        "recipientName",
        "recipientPhone",
        "deliveryRequestDetails",
    ])


    const handleChangeCep = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (value.length === 9) {
            GetAddress(value.replace('-', ''), (data) => {
                setForm(prev => ({
                    ...prev,
                    zipCode: data.cep,
                    address: data.logradouro ,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    uf: data.uf
                }))
            })
        } else
            setForm(prev => ({ ...prev, [name]: value }));
    }

    const { errors, form, handleChange, setErrors, setForm, validate } = useGenericFormValidator(initialForm, rules);

    return {
        initialForm,
        errors,
        form,
        handleChange,
        setErrors,
        setForm,
        validate,
        handleChangeCep
    }
}