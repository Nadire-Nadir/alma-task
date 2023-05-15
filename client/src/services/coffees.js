import axios from "axios";

const baseUrl = "http://localhost:3001/api/coffees";

const getAllCoffees = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const createCoffee = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
};

const getFilteredCoffees = (keyword) => {
    const request = axios.get(`${baseUrl}?keyword=${keyword}`, keyword);
    return request.then((response) => response.data);
};

export default {
    getAllCoffees,
    createCoffee,
    getFilteredCoffees,
};
