import {defineStore} from 'pinia'
import { Student } from './student'
import { api } from '@/utils';
import { Attendance } from './attendance';

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    students: [] as Student[],
    number_of_students: 0,
    remaining: 0,
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
    },
    async updateStudentAttendances(student_id: number, attendance: Attendance){
        //@ts-ignore
        this.students = this.students.map(item => item.id == student_id ? {
          ...item,
          attendance: new Date(attendance.created_at).toDateString() == new Date().toDateString() ? attendance : null,
        } : item)
        const student = this.students.find(item => item.id == student_id)
        if(student){
          const existsAttendance = student.attendances.find(item => item.id == attendance.id)
          if(existsAttendance){
            student.attendances = student.attendances.map(item => item.id == attendance.id ? attendance : item)
          }else{
            student.attendances.unshift(attendance)
          }
        }
    },
    async removeInStudentAttendances(student_id: number, attendance_id: number){
      //@ts-ignore
      this.students = this.students.map(item => item.id == student_id ? {...item, attendances: item.attendances.filter(item => item.id != attendance_id), attendance: item.attendance.id == attendance_id ? null : item.attendance} : item)
    }
  }
})
