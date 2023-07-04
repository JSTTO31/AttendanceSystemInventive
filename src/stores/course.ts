import { api } from "@/utils";
import { defineStore, storeToRefs } from "pinia";
import { SubCategory, useSubCategoryStore } from "./sub_category";
import { useCategoryStore } from "./category";
import { useStudentStore } from "./student";


export interface Course{
  id: number;
  sub_category_id: number;
  name: string;
  image: string;
  number_of_session: number;
  description: string;
  created_at: string;
  updated: string;
  sub_category: SubCategory
}

export interface CourseState{
  courses: Course[]
  course: Course
}



export const useCourseStore = defineStore('course', {
  state: () : CourseState => ({
    courses: [],
    course: {} as Course
  }),
  actions: {
    async getAll(student_id: number){
      try {
        const response = await api.get(`/student/${student_id}/courses`)
        this.courses = response.data
        return response;
      } catch (error) {
        console.log(error)
      }
    },
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
        this.courses.push(response.data)
        const {category} = storeToRefs(useCategoryStore())
        category.value.sub_categories = category.value.sub_categories.map(item => item.id == response.data.sub_category_id ? {...item, courses: [...item.courses, {...response.data, sub_category: {...item, courses: null}}]} : item)

        return response
      } catch (error) {
        console.log(error)
      }
    },
    async delete(sub_category_id: number, course_id: number){
      try {
        const response = await api.delete(`sub_category/${sub_category_id}/courses/${course_id}`)
        this.courses = this.courses.filter(item => item.id != course_id);
        const {category} = storeToRefs(useCategoryStore())
        const sub_category = category.value.sub_categories.find(item => item.id == sub_category_id)
        if(sub_category){
          sub_category.courses = sub_category.courses.filter(item => item.id != course_id)
        }
        return response
      } catch (error) {
        console.log(error);
      }
    },
    async update(sub_category_id: number, course_id: number, course: any){
      try {
        const response = await api.put(`sub_category/${sub_category_id}/courses/${course_id}`, {...course})
        this.courses = this.courses.map(item => item.id == course_id ? {...item,
          name: course.name,
          number_of_session: course.number_of_session,
          description: course.description,
          sub_category_id: course.sub_category_id,
        } : item);
        const {category} = storeToRefs(useCategoryStore())
        const sub_category = category.value.sub_categories.find(item => item.id == sub_category_id)
        if(sub_category){
          sub_category.courses = sub_category.courses.map(item => item.id == course_id ? {...item,
            name: course.name,
            number_of_session: course.number_of_session,
            description: course.description,
            sub_category_id: course.sub_category_id,
          } : item)
        }
        return response
      } catch (error) {
        console.log(error);
      }
    },
    async changeImage(sub_category_id: number, course_id: number, image: any){
      const formData = new FormData();
      formData.append('image', image)
      try {
        const response = await api.post(`/sub_category/${sub_category_id}/courses/${course_id}/change-image`, formData, {
          headers: {
            "Content-Type" : 'multipart/form-data'
          }
        })

        const {category} = storeToRefs(useCategoryStore())
        category.value.sub_categories = category.value.sub_categories.map(item => item.id == sub_category_id ? {...item, courses: item.courses.map(item => item.id == course_id ? {...item, image: response.data} : item)} : item)

        return response;
      } catch (error) {
        console.log(error)
      }
    },
    async add_attendee(course_id: number, student_id: number, date: any){
      try {
        const response = await api.post(`/course/${course_id}/add_attendee`, {
          student_id, date
        })
        const {students} = storeToRefs(useStudentStore())
        students.value = students.value.map(item => item.id == student_id ? {...item, attendances: [...item.attendances, ...response.data]} : item)

        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async remove_attendee(course_id: number, student_id: number){
      try {
        const response = await api.delete(`course/${course_id}/student/${student_id}/remove_attendee`)
        this.courses = this.courses.filter(item => item.id != course_id)
        return response;
      } catch (error) {
        console.log(error)
      }
    },
  }
})
