import { api } from "@/utils";
import { defineStore, storeToRefs } from "pinia";
import { useAppStore } from "./app";
import { Student, useStudentStore } from "./student";

export interface Attendance{
  id: number;
  student_id: number
  course_id: number
  time_in: string;
  time_out: string;
  is_absent: boolean
  work_time: string;
  created_at: string;
  updated_at: string
  student: Student
  policy: boolean
  late_time: string
  is_event: boolean
}

export interface month_attendances{
  "01" ?:  Attendance[],
  "02" ?:  Attendance[],
  "03" ?:  Attendance[],
  "04" ?:  Attendance[],
  "05" ?:  Attendance[],
  "06" ?:  Attendance[],
  "07" ?:  Attendance[],
  "08" ?:  Attendance[],
  "09" ?:  Attendance[],
  "10" ?:  Attendance[],
  "11" ?:  Attendance[],
  "12" ?:  Attendance[],
}


interface AttendanceState{
  attendances: Attendance[],
  attendance: Attendance,
  selectedMonth: number
}

export const useAttendanceStore = defineStore('attendance', {
  state: () : AttendanceState => ({
    attendances: [],
    attendance: {} as Attendance,
    selectedMonth: new Date().getMonth()
  }),
  actions: {
    async getAllStudentAttendance(student_id: number){
      try {
        const response = await api.get(`/student/${student_id}/attendances`)
        const {attendances, work_time_total, late_time_total} = response.data
        const {student} = storeToRefs(useStudentStore())
        const {students} = storeToRefs(useAppStore())
        student.value = {...student.value, attendances, work_time_total, late_time_total}
        students.value = students.value.map((item) => item.id == student_id ? {...item, attendances, work_time_total, late_time_total} : item)
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    async enterWithPolicy(student_id: number){
      try {
        const response = await api.post(`student/${student_id}/attendances`, {policy: true})
        const {attendance, remaining} = response.data
        this.attendances.unshift(attendance)
        const {student} = storeToRefs(useStudentStore())
        const {students} = storeToRefs(useAppStore())
        students.value = students.value.map(item => item.id == student_id ? {...item, remaining: remaining, attendance: attendance} : item)
        

        if(student.value.id == student_id){
          student.value.attendance = attendance
        }

        if(!student.value.attendances){
          student.value.attendances = []
        }


        student.value.attendances.unshift(attendance)

        return response
      } catch (error) {
        console.log(error);
      }
    },
    async enter(student_id: number){
      try {
        const response = await api.post(`student/${student_id}/attendances`)
        const {attendance, remaining} = response.data
        this.attendances.unshift(attendance)
        const { student} = storeToRefs(useStudentStore())
        const {students} = storeToRefs(useAppStore())
        students.value = students.value.map(item => item.id == student_id ? {...item, attendance: attendance } : item)

        if(student.value.id == student_id){
          student.value.attendance = attendance
        }

        if(!student.value.attendances){
          student.value.attendances = []
        }

        student.value.attendances.unshift(attendance)

        return response
      } catch (error) {
        console.log(error);
      }
    },
    async leave(student_id: number, attendance_id: number){
      try {
        const response = await api.put(`student/${student_id}/attendances/${attendance_id}/leave`)
        this.attendances = this.attendances.map(item => item.id == response.data.id ? response.data : item)
        const {student} = storeToRefs(useStudentStore())
        const {students} = storeToRefs(useAppStore())
         students.value = students.value.map(item => item.id == student_id ? {...item, attendance: response.data} : item)

        if(student.value.id == student_id){
          student.value.attendance = response.data
        }

        console.log(response.data);


        student.value.attendances = student.value.attendances.map(item => item.id == attendance_id ? response.data : item)

        student.value.work_time_total += response.data.work_time

        return response
      } catch (error) {
        console.log(error);
      }
    },
    async absent(student_id: number){
      try {
        const response = await api.post(`student/${student_id}/attendances/absent`)
        this.attendances.unshift(response.data)
        const {student} = storeToRefs(useStudentStore())
        const {students} = storeToRefs(useAppStore())
        students.value = students.value.map(item => item.id == student_id ? {...item, attendance: response.data} : item)
    

        if(student.value.id == student_id){
          student.value.attendance = response.data
        }

        if(!student.value.attendances){
          student.value.attendances = []
        }

        student.value.attendances.unshift(response.data)

        return response
      } catch (error) {
        console.log(error)
      }
    },
    async manual(student_id: number, attendance: any){
      try {
        const response = await api.post(`student/${student_id}/attendances/manual`, attendance)
        this.attendances.unshift(response.data)
        const {student} = storeToRefs(useStudentStore())
        const {students} = storeToRefs(useAppStore())
        
        students.value = students.value.map(item => item.id == student_id ? {...item, attendance: response.data} : item)

        if(student.value.id == student_id && new Date().toDateString()  == new Date(response.data.created_at).toDateString()){
          student.value.attendance = response.data
        }

        if(!student.value.attendances){
          student.value.attendances = []
        }

        student.value.attendances.unshift(response.data)
        student.value.work_time_total += response.data.work_time || 0 
        student.value.late_time_total += response.data.late_time || 0 

        return response
      } catch (error) {
        console.log(error)
      }
    }
  }
})
