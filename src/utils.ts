import axios from "axios"

export function showError(validator: any, error_message = ""){
  if(validator.$invalid && validator.$dirty){
      return error_message.length > 0 ? error_message :  validator.$errors[0].$message
  }

  return ""
}

export const api = axios.create({
  baseURL: 'https://www.inventivemedia.com.ph/ojt/public/api',
  headers: {
    Accept: 'application/json',
    "Content-Type": 'application/json',
  }
})

export interface link{
  url: string,
  label: string,
  active: boolean
}

export interface Page{
  current_page: number,
  first_page_url: string,
  from: number,
  last_page: number,
  last_page_url: string,
  links: link[];
  next_page_url: string,
  path: string,
  per_page: number,
  prev_page_url: string,
  to: number,
  total: number,
  query: string,

}
