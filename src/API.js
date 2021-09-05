import axios from "axios";

const api = axios.create({
  baseURL: "https://agenda-pw2-backend.herokuapp.com/",
  headers: {'Content-Type': 'application/json'}
});

export default api;