import { api } from "@/utils";
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
  remaining: number;
  attendances: Attendance[]
}

interface StudentState{
  students: Student[],
  student: Student
}

export const useStudentStore = defineStore('student', {
  state: () : StudentState => ({
    students: [],
    student: {} as Student
  }),
  actions: {
    async getAll() {
        try {
          const response = await auth.get('students')
          this.students = response.data;

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
    }
  }
})
