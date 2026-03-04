export interface IDeliveryRequest {
    idDeliveryRequest: string
    numOrder?: number
    zipCode: string
    address: string
    numberAddress?: string
    neighborhood: string
    city: string
    uf: string
    complementAddress?: string
    longitude: number
    latitude: number
    idStatusDeliveryRequest: string
    idCustomer: string
    dtRegister: string
    deliveryFee: number
    orderValue: number
    recipientName: string
    recipientPhone: string
    recipientEmail?: string
    deliveryRequestDetails?: string
    deliveryRequestObservation?: string
}