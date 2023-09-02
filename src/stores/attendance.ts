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
  event: Event
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
  selectedMonth: number,
  weekly_attendances: Attendance[],
  today_attendances: Attendance[]
}

export const useAttendanceStore = defineStore('attendance', {
  state: () : AttendanceState => ({
    attendances: [],
    attendance: {} as Attendance,
    selectedMonth: new Date().getMonth(),
    weekly_attendances: [],
    today_attendances: [],
  }),
  actions: {
    async getAll(){
      try {
        const response = await api.get('/attendances');
        const {weekly_attendances, today_attendances} = response.data
        this.weekly_attendances = weekly_attendances
        this.today_attendances = today_attendances
      } catch (error) {
        console.log(error);

      }
    },
    async getWeeklyAttendance(){
      try {
        const response = await api.get('/attendances/weekly');
        this.weekly_attendances = response.data
        return response
      } catch (error) {
        console.log()
      }
    },
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
        const $student = useStudentStore()
        const $app = useAppStore()
        $app.updateStudentAttendances(student_id, response.data);
        $student.updateStudentAttendance(student_id, response.data)
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

        student.value.attendances.unshift(response.data)

        return response
      } catch (error) {
        console.log(error)
      }
    },
    async manual(student_id: number, attendance: any){
      try {
        const response = await api.post(`student/${student_id}/attendances/manual`, {...attendance})
        this.attendances.unshift(response.data)
        const $student = useStudentStore()
        const $app = useAppStore()
        $app.updateStudentAttendances(student_id, response.data);
        $student.updateStudentAttendance(student_id, response.data)

        return response
      } catch (error) {
        console.log(error)
      }
    },
    async manual_remove(student_id: number, attendance: any){
      console.log(attendance);

      try {
        const response = await api.post(`student/${student_id}/attendances/manual-remove`, attendance);
        const {student} = storeToRefs(useStudentStore())
        const {students} = storeToRefs(useAppStore())

        console.log(response.data);

        this.attendances = this.attendances.filter(item => new Date(item.created_at).toDateString() != new Date(attendance.time_in).toDateString())

        student.value.attendances = student.value.attendances.filter(item =>  new Date(item.created_at).toDateString() != new Date(attendance.time_in).toDateString())

        if(student.value.attendance && new Date(student.value.attendance.created_at).toDateString() == new Date(attendance.time_in).toDateString()){
          //@ts-ignore
          student.value.attendance = null
        }

        students.value = students.value.map(item => item.id == student_id ? {...item, attendances: item.attendances.filter(item =>  new Date(item.created_at).toDateString() != new Date(attendance.time_in).toDateString())} : item)

        return response
      } catch (error) {
        console.log(error)
      }
    },
    async remove(student_id: number, attendance_id: number){
      try {
        const response = await api.delete(`student/${student_id}/attendances/${attendance_id}`)
        const {student} = storeToRefs(useStudentStore())
        const $app = useAppStore()
        this.attendances = this.attendances.filter(item => item.id != attendance_id)
        student.value.attendances = student.value.attendances.filter(item => item.id != attendance_id)

        $app.removeInStudentAttendances(student_id, attendance_id)

        if(student.value.attendance && student.value.attendance.id == attendance_id){
          //@ts-ignore
          student.value.attendance = null
        }

        return response;
      } catch (error) {
        console.log(error)
      }
    },
    async relogin(student_id: number, attendance_id: number){
      try {
        const response = await api.put(`student/${student_id}/attendances/${attendance_id}/re-enter`)
        const $student = useStudentStore()
        const $app = useAppStore()
        $app.updateStudentAttendances(student_id, response.data);
        $student.updateStudentAttendance(student_id, response.data)
        this.attendances = this.attendances.map(item => item.id == attendance_id ? response.data : item)

        return response
      } catch (error) {
        console.log(error)
      }
    },
  }
})
