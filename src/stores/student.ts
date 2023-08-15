import { Page, api } from "@/utils";
import { defineStore, storeToRefs } from "pinia";
import { Attendance, useAttendanceStore } from "./attendance";
import { useAppStore } from "./app";

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
  late_time_total: number;
  position: string;
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
      const attendances = state.student.attendances.filter(attendance => !!attendance.work_time)


      const hours = attendances.reduce((sum, item) => sum += parseInt(item.work_time), 0)
      const minutes = attendances.reduce((sum, item) => {
        return sum += parseFloat(parseFloat(item.work_time).toFixed(2).toString().split('.')[1]) || 0
      },0)
      const convert_minutes_to_hours = (minutes / 60).toFixed(0)

      return hours + parseInt(convert_minutes_to_hours) + parseFloat('.' + (minutes % 60).toString())
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
    get(student_id: any){
      const $attendance = useAttendanceStore()
      const {students} = storeToRefs(useAppStore())
      const isExists = students.value.find(item => item.id == student_id)
      if(isExists){
        this.student = isExists
        if(this.student.attendances && this.student.attendances.length > 0){
          $attendance.getAllStudentAttendance(student_id);
          return new Promise((resolve) => {
            resolve(this.student)
          })
        }
        $attendance.getAllStudentAttendance(student_id);

        return new Promise((resolve) => {
          resolve(this.student)
        })
      }

      return api.get('students/' + student_id).then((response) => {
        this.student = response.data
        this.student.attendances = []
        $attendance.getAllStudentAttendance(student_id);
      })
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
        this.student = {...this.student, ...information}
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
        return error
      }
    },
    async remove(student_id: number){
      try {
        const response = await api.delete('students/' + student_id)
        const {students: appStoreStudents} = storeToRefs(useAppStore())
        this.student = this.student.id == student_id ? {} as Student : this.student;
        this.students = this.students.filter(student => student.id != student_id)
        appStoreStudents.value = this.students.filter(student => student.id != student_id);
        return response
      } catch (error) {
        console.log(error)
      }
    },
    updateStudentAttendance(student_id: number, attendance: Attendance){

      if(this.student.id == student_id && new Date().toDateString()  == new Date(attendance.created_at).toDateString()){

        this.student.attendance = attendance
      }

      const existsAttendance = this.student.attendances.find(item => item.id == attendance.id)

      if(existsAttendance){
        this.student.attendances = this.student.attendances.map(item => item.id == attendance.id ? attendance : item)
      }else{
        this.student.attendances.unshift(attendance)
      }

      this.student.work_time_total = this.student.attendances.reduce((sum, item) => sum += !item.work_time ? 0 : parseFloat(item.work_time), 0)
      this.student.late_time_total = this.student.attendances.reduce((sum, item) =>
      sum += !item.late_time ? 0 : parseFloat(item.late_time), 0)
    }
  }
})
