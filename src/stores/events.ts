import { Page, api } from "@/utils";
import { defineStore } from "pinia";
import { Student } from "./student";


export interface Event{
  id: number;
  title: string;
  subtitle: string;
  date_time: any;
  mode: any
  organizer: any,
  location: any
  attendees: Student[]
}

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [] as Event[],
    event: {} as Event,
    paginateOptions: {} as Page
  }),
  actions: {
    async getEvents(){
      try {
        const response = await api.get('/events')
        const {options, events} = response.data
        this.events = events;
        this.paginateOptions = options

      } catch (error) {
        console.log(error);

      }
    },
    async getEvent(student_id: number){
      try {
        const response = await api.get('/events/' + student_id)
        this.event = response.data;

        return response
      } catch (error) {
        console.log(error)
      }
    },
    async addAttendees(students: Student[]){
      try {
        const response = await api.post(`event/${this.event.id}/attendees`, {students})
        this.event.attendees.push(...response.data)

        return response;
      } catch (error) {
        console.log(error)
      }
    },
    async removeAttendee(event_id: number, student_id: number){
      try {
        const response = await api.delete(`/event/${event_id}/student/${student_id}/attendee/remove`)
        this.event.attendees = this.event.attendees.filter(item => item.id != student_id)
        return response
      } catch (error) {
        console.log(error);

      }
    }
  },
})
