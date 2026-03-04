import { useRef, useState } from "react"
import type Modal from "../../../components/inputs/Modal"
import type { IDeliveryRequestMotoboy } from "../../../interface/IDeliveryRequestMotoboy";

export const useOrderSolicitation = () => {
    const modalNewSolicitationRef = useRef<Modal>(null);
    const [deliveryMotoboys, setDeliveryMotoboys] = useState<IDeliveryRequestMotoboy[]>([])


    return {
        modalNewSolicitationRef,
        setDeliveryMotoboys,
        deliveryMotoboys
    }
}