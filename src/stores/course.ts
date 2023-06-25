import { api } from "@/utils";
import { defineStore } from "pinia";

export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [],
    course: {}
  }),
  actions: {
    async store(sub_category_id: number, course: any){
      const formData = new FormData()
      formData.append('image', course.image)
      formData.append('name', course.name)
      formData.append('description', course.description)
      formData.append('number_of_session', course.number_of_session)

      try {
        const response = await api.post(`sub_category/${sub_category_id}/courses`, formData, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        })

        return response
      } catch (error) {
        console.log(error)
      }
    }
  }
})
