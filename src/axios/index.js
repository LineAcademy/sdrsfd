import axios from 'axios'

export default axios.create({
    baseURL: import.meta.env.VITE_APP_ENV == "production" ? 'https://gym-managementkw.com/api/' : import.meta.env.VITE_APP_ENV == "staging" ? 'https://staging.gym-managementkw.com/api/' : 'http://127.0.0.1:8000/api/admin/',
    headers: {
        'language': 'En',
        'Apikey': '',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization:
        localStorage.getItem("userInfo") != null
        ? "Bearer " + JSON.parse(localStorage.getItem("userInfo")).token
        : "",
    }
})