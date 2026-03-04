import { useState } from "react";
import { useFormOrderSolicitation } from "./useFormOrderSolicitation";
import { AddDeliveryRequest, DeliveryRequest } from "../../../services/DeliveryRequest/DeliveryRequestService";
import type { IDeliveryRequestMotoboy } from "../../../interface/IDeliveryRequestMotoboy";
import type Modal from "../../../components/inputs/Modal";

type OrderSolicitationModalStepsType = "OrderData" | "AddressData" | "CustomerData" | "PaymentData"

type UseOrderSolicitationModalProps = {
    setDeliveryMotoboys: React.Dispatch<React.SetStateAction<IDeliveryRequestMotoboy[]>>,
    modalRef: React.RefObject<Modal | null>,
}

export const useOrderSolicitationModal = ({ setDeliveryMotoboys, modalRef }: UseOrderSolicitationModalProps) => {
    const { form, handleChange, errors, handleChangeCep, validate, setErrors, setForm } = useFormOrderSolicitation();
    const [steps, setSteps] = useState<OrderSolicitationModalStepsType>("OrderData");

    const nexStep = () => {
        var isvalid = validate();
        if (steps === "OrderData") {
            if (errors["numOrder"] || errors["deliveryRequestDetails"]) return;

            setSteps("PaymentData")
            setErrors({});

            return;
        }

        if (steps === "PaymentData") {
            if ((errors["deliveryFee"] || errors["orderValue"]) || form.deliveryFee === 0 || form.orderValue === 0) return;

            setSteps("CustomerData")
            setErrors({});

            return;
        }

        if (steps === "CustomerData") {
            if ((errors["recipientName"] || errors["recipientPhone"])) return;


            setSteps("AddressData")
            setErrors({});

            return;
        }

        if (isvalid) {
            AddDeliveryRequest(form, request => {
                modalRef.current?.onClose()
                DeliveryRequest(request.idDeliveryRequest, delivery => {
                    setDeliveryMotoboys(prev => ([...prev, delivery]))
                })
            })
        }

    }
    const lastStep = () => {
        switch (steps) {
            case "PaymentData":
                setSteps("OrderData")
                break;
            case "CustomerData":
                setSteps("PaymentData")
                break;
            case "AddressData":
                setSteps("CustomerData")
                break;
            default:
                break;
        }
    }

    return {
        form,
        handleChange,
        errors,
        handleChangeCep,
        steps,
        lastStep,
        nexStep,
        setForm
    }
}