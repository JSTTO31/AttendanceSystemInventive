import { api } from "@/utils";
import axios from "axios";
import { defineStore } from "pinia";

export interface User{
  id: number;
  name: string,
  email: string;
}


export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User,
    token: ''
  }),
  getters: {
    isLoging(){
      const userData = localStorage.getItem('userData')
      return !!userData
    }
  },
  actions: {
     login(credentials: {email: string, password: string}){
      const api = axios.create({
        baseURL: "https://www.inventivemedia.com.ph/ojt/index.php/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });


      return api.get("/sanctum/csrf-cookie").then(() => {
        return api.post("/api/login", { ...credentials }).then((response) => {
          localStorage.setItem('userData', JSON.stringify(response.data))
          window.location.reload()
        });
      });
    },
    setUser(){
      const userData = localStorage.getItem('userData');
      if(userData){
        const {user, token} = JSON.parse(userData)
        this.user = user;
        this.token = token
        api.defaults.withCredentials = true
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    },
    async logout(){
      try {
        const response = await api.post('/logout')
        window.location.reload()
        localStorage.removeItem('userData')
        return response
      } catch (error) {
        console.log(error)
      }
    }
  }
})



