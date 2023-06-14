import { api } from "@/utils";
import { defineStore, storeToRefs } from "pinia";
import { useAppStore } from "./app";
import { Student, useStudentStore } from "./student";

export interface Attendance{
  id: number;
  time_in: string;
  time_out: string;
  is_absent: boolean
  work_time: string;
  created_at: string;
  updated_at: string
  student: Student
}

interface AttendanceState{
  attendances: Attendance[],
  attendance: Attendance
}

export const useAttendanceStore = defineStore('attendance', {
  state: () : AttendanceState => ({
    attendances: [],
    attendance: {} as Attendance,
  }),
  actions: {
    async getAll(){
      try {
        const response = await api.get('attendances')
        this.attendances = response.data;

        return response;
      } catch (error) {
        console.log(error);

      }
    },
    async getAllStudentAttendance(student_id: number){
      try {
        const response = await api.get(`/student/${student_id}/attendances`)
        const {attendances, work_time_total} = response.data
        const {students, student} = storeToRefs(useStudentStore())
        students.value = students.value.map(item => item.id == student_id ? {...item, attendances, work_time_total} : item)
        student.value = {...student.value, attendances, work_time_total}

      } catch (error) {
        console.log(error)
      }
    },
    async enter(student_id: number){
      try {
        const response = await api.post(`student/${student_id}/attendances`)
        this.attendances.unshift(response.data)
        const {students: studentsFromStore, student} = storeToRefs(useStudentStore())
        const {students: studentsFromAppStore} = storeToRefs(useAppStore())
        studentsFromStore.value = studentsFromStore.value.map(item => item.id == student_id ? {...item, attendance: response.data} : item)
        studentsFromAppStore.value = studentsFromAppStore.value.map(item => item.id == student_id ? {...item, attendance: response.data} : item)

        if(student.value.id == student_id){
          student.value.attendance = response.data
        }

        if(!student.value.attendances){
          student.value.attendances = []
        }

        student.value.attendances.unshift(response.data)

        return response
      } catch (error) {
        console.log(error);
      }
    },
    async leave(student_id: number, attendance_id: number){
      try {
        const response = await api.put(`student/${student_id}/attendances/${attendance_id}/leave`)
        this.attendances = this.attendances.map(item => item.id == response.data.id ? response.data : item)
        const {students: studentsFromStore, student} = storeToRefs(useStudentStore())
        const {students: studentsFromAppStore} = storeToRefs(useAppStore())
         studentsFromStore.value = studentsFromStore.value.map(item => item.id == student_id ? {...item, attendance: response.data} : item)
         studentsFromAppStore.value = studentsFromAppStore.value.map(item => item.id == student_id ? {...item, attendance: response.data} : item)
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
        const {students: studentsFromStore, student} = storeToRefs(useStudentStore())
        const {students: studentsFromAppStore} = storeToRefs(useAppStore())
        studentsFromStore.value = studentsFromStore.value.map(item => item.id == student_id ? {...item, attendance: response.data} : item)
        studentsFromAppStore.value = studentsFromAppStore.value.map(item => item.id == student_id ? {...item, attendance: response.data} : item)

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
    }
  }
})
