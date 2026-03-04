import { setGlobalLoader } from '../context/LoaderContext';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { type ApiResponse } from '../types/ApiResponseType';
import { Alert } from '../util/alert';
import { clearUserDataGlobal } from '../globalHook/userDataGlobal';

const url = import.meta.env.VITE_API_URL;

type Callback<T = any> = (response: T) => void;

export default class Api {
    private api: AxiosInstance;
    private loginPage = '/login';

    constructor(baseURL: string = url) {
        this.api = axios.create({
            baseURL,
            withCredentials: true,
        });
    }

    private async execute<T = any>(
        apiCall: Promise<AxiosResponse<ApiResponse<T>>>,
        funcResult?: Callback<T>,
        hiddenLoader?: boolean
    ) {
        if (!hiddenLoader) setGlobalLoader(true);

        try {
            const response = await apiCall;

            if (response.data.requestSuccess) {
                funcResult?.(response.data.responseData);
                return;
            }

            const { message, exception } = response.data.erro || {};
            console.log(exception);
            Alert(message ?? 'Erro desconhecido', '', false);
        } catch (err: any) {
            console.error({ error: err });

            if (err.response?.status === 401) {
                window.location.href = this.loginPage;
                clearUserDataGlobal()
                return;
            }

            if(err.response?.status === 204)
                return;

            if (err.response?.data?.exception)
                Alert(err.response.data.erro.exception.message, '', false);
            else if (err.response?.data?.erro)
                Alert(err.response.data.erro.message, '', false);
            else
                Alert(
                    'Houve um erro na solicitação! Por favor tente novamente mais tarde',
                    '',
                    false
                );
        } finally {
            setGlobalLoader(false);
        }
    }

    get<T = any>(url: string, funcResult?: Callback<T>, hiddenLoader?: boolean) {
        this.execute<T>(this.api.get<ApiResponse<T>>(url), funcResult, hiddenLoader);
    }

    post<T = any>(url: string, data: any, funcResult?: Callback<T>) {
        this.execute<T>(this.api.post<ApiResponse<T>>(url, data), funcResult);
    }

    put<T = any>(url: string, data: any, funcResult?: Callback<T>) {
        this.execute<T>(this.api.put<ApiResponse<T>>(url, data), funcResult);
    }

    delete<T = any>(url: string, funcResult?: Callback<T>) {
        this.execute<T>(this.api.delete<ApiResponse<T>>(url), funcResult);
    }
}

export const api = new Api(url);
