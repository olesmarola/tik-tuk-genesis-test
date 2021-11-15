import axios from "axios";

const axiosFetcher = <T>(url:string) => axios.get<T>(url).then(res => res.data);

export default axiosFetcher;
