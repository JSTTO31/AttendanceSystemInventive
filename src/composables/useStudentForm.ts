import useVuelidate from "@vuelidate/core"
import { required, numeric, email, maxLength, minLength } from "@vuelidate/validators"
import { reactive } from "vue"

export default () => {
  const student = reactive({
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    phone_number: '',
    school_name: '',
    school_year: '',
    address: '',
    course: '',
    remaining: 550,
    position: ''
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
    student.first_name = ''
    student.last_name = ''
    //@ts-ignore
    student.gender = null
    student.email = ''
    student.phone_number = ''
    student.school_name = ''
    student.school_year = ''
    student.address = ''
    student.course = ''
    student.remaining = 550
    //@ts-ignore
    student.position = null
  }


  return {student, $v, reset}
}
