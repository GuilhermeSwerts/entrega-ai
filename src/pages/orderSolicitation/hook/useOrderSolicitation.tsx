import { useEffect, useRef, useState } from "react"
import type Modal from "../../../components/inputs/Modal"
import type { IDeliveryRequestMotoboy } from "../../../interface/IDeliveryRequestMotoboy";
import type { IOrders } from "../../../interface/IOrders";
import { GetAllDeliveryRequest } from "../../../services/DeliveryRequest/DeliveryRequestService";
import { useUserData } from "../../../context/UserDataContext";

export const useOrderSolicitation = () => {
    const { userData } = useUserData()
    const modalNewSolicitationRef = useRef<Modal>(null);
    const [deliveryMotoboys, setDeliveryMotoboys] = useState<IDeliveryRequestMotoboy[]>([])
    const [orders, setOrders] = useState<IOrders[]>([])
    const [orderSelected, setOrderSelected] = useState<IOrders | null>(null)

    useEffect(() => {

        GetAllDeliveryRequest(data => {
            setOrders(data)
            // if (data.length > 0)
            //     setOrderSelected(data[0])
        })

        const interval = setInterval(() => {
            GetAllDeliveryRequest(data => {
                setOrders(data);
                if (orderSelected) {
                    setOrderSelected(data.filter(x => x.iDeliveryRequest === orderSelected.iDeliveryRequest)[0])
                }
            })
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return {
        modalNewSolicitationRef,
        setDeliveryMotoboys,
        deliveryMotoboys,
        orders,
        orderSelected,
        setOrderSelected,
        userData
    }
}