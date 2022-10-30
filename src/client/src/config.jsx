import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "https://artuts4u-admin-dashboard.herokuapp.com"
})

export default axiosInstance;