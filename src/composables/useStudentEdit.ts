import { Student, useStudentStore } from "@/stores/student"
import useVuelidate from "@vuelidate/core"
import { required, numeric, email, maxLength, minLength, minValue, maxValue } from "@vuelidate/validators"
import { storeToRefs } from "pinia"
import { reactive } from "vue"

// complete name
// Mobile number
// Birthday
// schoolname
// year
// address
// courses

export default () => {
  const {student: currentStudent} = storeToRefs(useStudentStore())
  const student = reactive({
    first_name: currentStudent.value.first_name,
    last_name: currentStudent.value.last_name,
    gender: currentStudent.value.gender,
    email: currentStudent.value.email,
    phone_number: currentStudent.value.phone_number,
    school_name: currentStudent.value.school_name,
    school_year: currentStudent.value.school_year,
    address: currentStudent.value.address,
    course: currentStudent.value.course,
    url: currentStudent.value.image,
    position: currentStudent.value.position,
    remaining: currentStudent.value.remaining,
  })

  const rules = {
    first_name: {required},
    last_name: {required},
    gender: {required},
    email: {required, email},
    phone_number: {required, numeric, min: minLength(11), max: maxLength(11)},
    school_name: {required},
    school_year: {required},
    address: {required},
    course: {required},
    remaining: {required},
    position: {required},
  }

  const $v = useVuelidate(rules, student)


  const reset = () => {
    student.first_name = currentStudent.value.first_name,
    student.last_name = currentStudent.value.last_name,
    student.gender = currentStudent.value.gender,
    student.email = currentStudent.value.email,
    student.phone_number = currentStudent.value.phone_number,
    student.school_name = currentStudent.value.school_name,
    student.school_year = currentStudent.value.school_year,
    student.address = currentStudent.value.address,
    student.course = currentStudent.value.course,
    student.url = currentStudent.value.image,
    student.position = currentStudent.value.position
    student.remaining = currentStudent.value.remaining

    $v.value.$reset()
}


  return {student, $v, reset}
}
