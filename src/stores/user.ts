import { api } from "@/utils";
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
      return api.get("/sanctum/csrf-cookie").then(() => {
        return api.post("/api/login", { ...credentials }).then((response) => {
          localStorage.setItem('userData', JSON.stringify(response.data))
          window.location.reload()
        }).catch((error) => {
          return Promise.reject(error)

        });
      });
    },
    setUser(){
      const userData = localStorage.getItem('userData');
      if(userData){
        const {user, token} = JSON.parse(userData)
        this.user = user;
        this.token = token
        api.defaults.baseURL = process.env.API_LOCAL_URL + '/api'
        api.defaults.withCredentials = true
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    },
    async logout(){
      try {
        const response = await api.post('/logout')
        localStorage.removeItem('userData')
        window.location.reload()

        return response
      } catch (error) {
        console.log(error)
      }
    },
  }
})



