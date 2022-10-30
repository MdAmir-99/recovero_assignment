import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://artuts4u-admin-dashboard.herokuapp.com/"
})