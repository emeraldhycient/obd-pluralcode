import axios from 'axios'
// import { getToken, setToken, unsetToken } from './storage/token'
import globalBaseUrl from './globalBaseUrl'
// import { getStore, setStore } from './storage/persistToggles'
// import jwt_decode from "jwt-decode";

const axiosClient = axios.create({
    baseURL: globalBaseUrl,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})


// const refreshTokens = async () => {
//     const token = await getToken()
//     const refresh = await getStore('refreshToken');
//     const axios2 = axios.create({
//         baseURL: globalBaseUrl,
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         }
//     });
//     try {
//         const res = await axios2.post("/auth/refresh", { refreshToken: refresh });
//         return res.data;
//     } catch (err: any) {
//         throw new Error(err);
//     }
// }

// axiosClient.interceptors.request.use(
//     async (config) => {
//         const token = await getToken()
//         if (token) {
//             const decodedToken = jwt_decode<any>(token || "");

//             if (Date.now() >= decodedToken.exp * 1000) {
//                 try {
//                     const res = await refreshTokens();

//                     config.headers["authorization"] = "Bearer " + res.data.accessToken;

//                     await setToken(res?.data?.accessToken)
//                     await setStore("refreshToken", res?.data?.refreshToken)

//                     config.headers.Authorization = `Bearer ${res?.data?.accessToken}`


//                 } catch (error: any) {
//                 }
//             } else {
//                 config.headers.Authorization = `Bearer ${token}`
//             }
//         } else {
//         }

//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )

export default axiosClient
