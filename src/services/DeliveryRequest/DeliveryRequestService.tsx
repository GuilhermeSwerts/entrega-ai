import type { IDeliveryRequest } from "../../interface/IDeliveryRequest"
import type { IDeliveryRequestMotoboy } from "../../interface/IDeliveryRequestMotoboy"
import { api } from "../api"

const baseURL = 'DeliveryRequest'

export const AddDeliveryRequest = (data: IDeliveryRequest, callBack: (data: IDeliveryRequest) => void) => {
    api.post<IDeliveryRequest>(baseURL, data, callBack)
}

export const DeliveryRequest = (deliveryRequestId: string, callBack: (data: IDeliveryRequestMotoboy) => void) => {
    api.get<IDeliveryRequestMotoboy>(`${baseURL}/solicitation/motoboy/${deliveryRequestId}`, callBack)
}