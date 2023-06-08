import {defineStore} from 'pinia'
import { Student } from './student'
import { api } from '@/utils';

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    students: [] as Student[]
  }),
  actions: {
    async getCurrentOJT(){
      try {
        const response = await api.get('/students/current-ojts')
        console.log('triggered');

        this.students = response.data
        return response
      } catch (error) {
        console.log(error);

      }
    }
  }
})
