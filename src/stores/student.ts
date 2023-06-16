import { Page, api } from "@/utils";
import { defineStore } from "pinia";
import { auth } from "./user";
import { Attendance } from "./attendance";

export interface Student{
  id: number;
  first_name: string,
  last_name: string,
  email: string,
  phone_number: number,
  school_name: string,
  school_year: string,
  address: string,
  course: string
  gender: string
  image: string
  created_at: string;
  updated_at: string;
  attendance: Attendance
  remaining: string;
  attendances: Attendance[]
  work_time_total: number;
}

interface StudentState{
  students: Student[],
  student: Student,
  pageOptions: Page
}

export const useStudentStore = defineStore('student', {
  state: () : StudentState => ({
    students: [],
    student: {} as Student,
    pageOptions: {} as Page
  }),
  getters: {
    getStatusById: state => (student_id: number) => {
      const student = state.students.find(item => item.id == student_id)
      if(student){
        if(student.attendance && student.attendance.is_absent){
          return 'absent';
        }else if(student.attendance && student.attendance.time_in && student.attendance.time_out){
          return 'present';
        }else{
          return 'in_process';
        }
      }
      return ''
    },
    workTimeTotal: state => () => {
      return !state.student.attendances ? 0 :state.student.attendances.reduce((sum, item) => sum += parseInt(item.work_time || '0') - parseInt(item.late_time || '0'), 0)
    }
   },
  actions: {
    async getAll(query = '') {
        try {
          const response = await api.get('/students' + query)
          const {students, pageOptions} = response.data;
          this.students = students;
          this.pageOptions = pageOptions
          return response;
        } catch (error) {
          console.log(error)
        }
    },
    async get(student_id: any){
      try {
        const response = await api.get('students/' + student_id)
        this.student = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async store(information: any) {
        try {
          const response = await api.post('students', { ...information })
          return response;
        } catch (error) {
          console.log(error);
        }
    },
    async edit(information: any){
      try {
        const response = await api.put('students/' + this.student.id, { ...information })
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async changeProfile(image: any){
      const form = new FormData()
      form.append('image', image)
      try {
        const response = await api.post(`/students/${this.student.id}/change-profile`, form, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        })

        this.student = {...this.student, image: response.data}
        this.students = this.students.map(item => item.id == this.student.id ? this.student : item)

        return response;
      } catch (error) {
        console.log(error);

      }
    }
  }
})
