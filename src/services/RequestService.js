import axios from "axios";

const RequestService = axios.create({
    baseURL: process.env.REACT_APP_baseUrl || "https://localhost:5000",
});

export default RequestService;