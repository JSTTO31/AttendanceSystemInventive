import { api } from "@/utils";
import axios from "axios";
import { defineStore } from "pinia";

export interface User{
  id: number;
  name: string,
  email: string;
}

export const auth = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})


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
        baseURL: "http://127.0.0.1:8000/",
        // withCredentials: true,
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
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
  }
})


