import { toast } from "react-toastify";
import { setGlobalLoader } from "../../context/LoaderContext";
import type { IAddress } from "../../interface/IAddress";

export const GetAddress = (zipCode: string, callBack: (data: IAddress) => void) => {

    setGlobalLoader(true);
    fetch(import.meta.env.VITE_VIA_CEP_URL.replace("[zipCode]", zipCode.replaceAll('-', '').replace('.', '').replace(' ', '')))
        .then(async response => {
            var data = await response.json();

            if (data.erro) {
                toast.error("CEP não encontrado")
                return null;
            }

            callBack?.(data as IAddress);
            return data
        })
        .catch(() => {
            toast.error('Houve um erro ao buscar o endereço')
        }).finally(() => {
            setGlobalLoader(false);
        })

}