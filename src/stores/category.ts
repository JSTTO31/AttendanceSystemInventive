import { api } from '@/utils';
import {defineStore} from 'pinia'
import { SubCategory } from './sub_category';

export interface Category{
  id: number,
  name: string;
  created_at: string
  updated_at: string
  sub_categories: SubCategory[]
}

export interface CategoryState{
  categories: Category[]
  category: Category
}

export const useCategoryStore = defineStore('category', {
  state: () : CategoryState => ({
    categories: [],
    category: {} as Category
  }),
  actions: {
    async getAll(){
      try {
        const response = await api.get('categories')
        this.categories = response.data;

        return response
      } catch (error) {
        console.log();

      }
    },
    async store(name: string){
      try {
        const response = await api.post('categories', {name})
        //@ts-ignore
        this.categories.unshift(response.data)

        return response;
      } catch (error) {
        console.log(error)
      }
    },
    async update(category_id: number, name: string){
      try {
        const response = await api.put('categories/' + category_id, {name})
        //@ts-ignore
        this.categories = this.categories.map(item => item.id == category_id ? {...item, name} : item)
        return response;
      } catch (error) {
        console.log(error)
      }
    },
    async delete(category_id: number){
      try {
        const response = await api.delete('categories/' + category_id)
        this.categories = this.categories.filter(item => item.id != category_id);

        return response
      } catch (error) {
        console.log(error);
      }
    }
  }
})
