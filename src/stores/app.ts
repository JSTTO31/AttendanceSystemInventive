import {defineStore} from 'pinia'
import { Student } from './student'
import { api } from '@/utils';

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    students: [] as Student[],
    number_of_students: 0,
    remaining: 0
  }),
  actions: {
    async getCurrentOJT(){
      try {
        const response = await api.get('/students/current-ojts')
        const {students, number_of_students, remaining} = response.data
        this.number_of_students = number_of_students;
        this.remaining = remaining
        this.students = students
        return response
      } catch (error) {
        console.log(error);

      }
    }
  }
})
