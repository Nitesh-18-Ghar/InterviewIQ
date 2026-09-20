import axios from "axios"

const api = axios.create({       // Jo bhi repeated chezin hai usko ek variable mein store kar liya so lamba code nhi likhna pade
    baseURL: "http://localhost:3000",
    withCredentials: true          // for tokens and cookies access from server
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post("/api/auth/register", {
            username,email,password
        })

        return response.data
    
    } catch(err) {
        console.log(err)
    }
    
}

export async function login({ email, password }) {

    try {
        const response = await api.post("/api/auth/login", {
            email,password
        })

        return response.data

    } catch(err) {
        console.log(err)
    }
    
}

export async function logout() {

    try {
        const response = await api.get("/api/auth/logout")

        return response.data

    } catch(err) {
        console.log(err)
    }
    
}

export async function getMe() {

    try {
        const response = await api.get("/api/auth/get-me")

        return response.data    

    } catch(err) {
        console.log(err)
    }
    
}

