import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export function getBaseURL(): string {
    return "http://0.0.0.0:8000";
}

const axiosService = axios.create({
    baseURL: getBaseURL(),
    headers: {
        "Content-Type": "application/json",
    },
});

// Define the type for the auth object
interface Auth {
    access: string;
    refresh: string;
    user: any; // Change 'any' to a more specific type if possible
}

axiosService.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const authString = localStorage.getItem("auth");
    const auth: Auth | null = authString ? JSON.parse(authString) : null;

    // Ensure headers is defined
    if (config.headers) {
        if (auth && auth.access) {
            config.headers.Authorization = `Bearer ${auth.access}`;
        }
    }

    return config;
});

axiosService.interceptors.response.use(
    (res: AxiosResponse) => Promise.resolve(res),
    (err) => Promise.reject(err)
);

const refreshAuthLogic = async (failedRequest: any) => { // Specify a more precise type if possible
    const authString = localStorage.getItem("auth");
    const auth: Auth | null = authString ? JSON.parse(authString) : null;

    if (auth && auth.refresh) {
        const data = JSON.stringify({ refresh: auth.refresh });
        return axios
            .post("/api/token/refresh/", data, {
                baseURL: getBaseURL(),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((resp: AxiosResponse) => {
                const { access, refresh } = resp.data;
                if (failedRequest.response.config.headers) {
                    failedRequest.response.config.headers["Authorization"] = "Bearer " + access;
                }
                const { user } = auth; // Use the user from the existing auth object
                localStorage.setItem("auth", JSON.stringify({ access, refresh, user }));
            })
            .catch(() => {
                localStorage.removeItem("auth");
            });
    }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher(url: string) { // Specify the type for the url parameter
    return axiosService.get(url).then((res: AxiosResponse) => res.data);
}

export default axiosService;