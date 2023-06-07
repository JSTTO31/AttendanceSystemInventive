import axios from "axios"

export function showError(validator: any, error_message = ""){
  if(validator.$invalid && validator.$dirty){
      return error_message.length > 0 ? error_message :  validator.$errors[0].$message
  }

  return ""
}

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    Accept: 'application/json',
    "Content-Type": 'application/json',
  }
})
