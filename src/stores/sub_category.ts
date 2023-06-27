import { api } from '@/utils';
import {defineStore} from 'pinia'
import { Course } from './course';

export interface SubCategory{
  id: number;
  name: string;
  category_id: number;
  category_name: string;
  courses: Course[]
  created_at: string;
  updated_at: string;
}

export interface SubCategoryState{
  sub_categories: SubCategory[];
  sub_category: SubCategory
}


export const useSubCategoryStore = defineStore('sub_category', {
  state: () : SubCategoryState => ({
    sub_categories: [],
    sub_category: {} as SubCategory
  }),
  actions: {
    async getAll(){
      try {
        const response = await api.get('sub_categories')
        this.sub_categories = response.data;

        return response
      } catch (error) {
        console.log();

      }
    },
    async store(category_id: number, name: string){
      try {
        const response = await api.post(`category/${category_id}/sub_categories`, {name})
        //@ts-ignore
        this.sub_categories.unshift(response.data)
        return response;
      } catch (error) {
        console.log(error)
      }
    },
    async update(category_id: number, sub_category_id: number, name: string){
      try {
        const response = await api.put(`sub_categories/${sub_category_id}`, {category_id, name})
        console.log(response.data.category_name);

        //@ts-ignore
        this.sub_categories = this.sub_categories.map(item => item.id == sub_category_id ? {...item, name, category_name: response.data.category_name} : item)
        return response;
      } catch (error) {
        console.log(error)
      }
    },
    async delete(category_id: number, sub_category_id: number){
      try {
        const response = await api.delete(`category/${category_id}/sub_categories/` + sub_category_id)
        this.sub_categories = this.sub_categories.filter(item => item.id != sub_category_id);
        return response
      } catch (error) {
        console.log(error);
      }
    }
  }
})
