import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const api: AxiosInstance = axios.create({
    responseType: "json",
    withCredentials: true,
    baseURL: "https://api.solana.webtm.ru"
});

export const createInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    return api({
        ...config,
        ...options
    }).then(r => r.data)
}

export type BodyType<Data> = Data;
