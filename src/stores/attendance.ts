import { api } from "@/utils";
import { defineStore, storeToRefs } from "pinia";
import { useAppStore } from "./app";

export interface Attendance{
  id: number;
  time_in: string;
  time_out: string;
  is_absent: boolean
  work_time: number;
  created_at: string;
  updated_at: string
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
    async enter(student_id: number){
      try {
        const response = await api.post(`student/${student_id}/attendances`)
        this.attendances.unshift(response.data)
        const {students} = storeToRefs(useAppStore())
        const student = students.value.find(item => item.id == student_id)
        if(student){
          student.attendance = response.data
        }
      } catch (error) {
        console.log(error);
      }
    },
    async leave(student_id: number, attendance_id: number){
      try {
        const response = await api.put(`student/${student_id}/attendances/${attendance_id}/leave`)
        this.attendances = this.attendances.map(item => item.id == response.data.id ? response.data : item)
        const {students} = storeToRefs(useAppStore())
        const student = students.value.find(item => item.id == student_id)
        if(student){
          student.attendance = response.data
        }
      } catch (error) {
        console.log(error);
      }
    },
    async absent(student_id: number){
      try {
        const response = await api.post(`student/${student_id}/attendances/absent`)
        this.attendances.unshift(response.data)
        const {students} = storeToRefs(useAppStore())
        const student = students.value.find(item => item.id == student_id)
        if(student){
          student.attendance = response.data
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
