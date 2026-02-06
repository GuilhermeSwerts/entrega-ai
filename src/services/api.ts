import { setGlobalLoader } from '../context/LoaderContext';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { type ApiResponse } from '../types/ApiResponseType';
import { Alert } from '../util/alert';

const url = import.meta.env.VITE_API_URL;

type Callback<T = any> = (response: T) => void;

export default class Api {
    private api: AxiosInstance;
    private loginPage: string;
    constructor(urlBase: string = "") {
        this.loginPage = "/login";
        this.api = axios.create({
            baseURL: urlBase,
            withCredentials: true
        });
    }

    private execute = <T = any>(
        apiCall: Promise<AxiosResponse<ApiResponse<T>>>,
        funcResult?: (data: T) => void,
        hiddenLoader?: boolean
    ): void => {
        !hiddenLoader && setGlobalLoader(true);
        apiCall
            .then((response) => {
                if (response.data.requestSuccess) {
                    funcResult?.(response.data.responseData);
                    return;
                }

                const { message, exception } = response.data.erro || {};
                console.log(exception);
                Alert(message ?? "Erro desconhecido", '', false);
            })
            .catch((err: any) => {
                console.error({ error: err });
                if (err.response?.status === 401) {
                    window.localStorage.removeItem("access_token");
                    window.location.href = this.loginPage;
                    return;
                }

                if (err.response && err.response.data && err.response.data.exception)
                    Alert(err.response.data.erro.exception.message, '', false);
                else if (err.response && err.response.data && err.response.data.erro)
                    Alert(err.response.data.erro.message, '', false);
                else
                    Alert("Houve um erro na solicitação! Por favor tente novamente mais tarde", '', false);
            })
            .finally(() => {
                setGlobalLoader(false);
            });
    };

    get = <T = any>(url: string, funcResult?: Callback<T>, hiddenLoader?: boolean): void => {
        this.execute<T>(this.api.get<ApiResponse<T>>(url), funcResult, hiddenLoader);
    };

    delete = <T = any>(url: string, funcResult?: Callback<T>): void => {
        this.execute<T>(this.api.delete<ApiResponse<T>>(url), funcResult);
    };

    post = <T = any>(url: string, form: any, funcResult?: Callback<T>): void => {
        this.execute<T>(this.api.post<ApiResponse<T>>(url, form), funcResult);
    };

    put = <T = any>(url: string, form: any, funcResult?: Callback<T>): void => {
        this.execute<T>(this.api.put<ApiResponse<T>>(url, form), funcResult);
    };

}

export const api = new Api(url);
