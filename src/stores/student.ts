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
  image: string
  created_at: string;
  updated_at: string;
  attendance: Attendance
  remaining: string;
  attendances: Attendance[]
  work_time_total: number
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
  }
})
