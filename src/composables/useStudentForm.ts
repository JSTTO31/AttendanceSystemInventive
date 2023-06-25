import { useStudentStore } from "@/stores/student"
import useVuelidate from "@vuelidate/core"
import { required, numeric, email, maxLength, minLength, minValue, maxValue } from "@vuelidate/validators"
import { reactive } from "vue"

// complete name
// Mobile number
// Birthday
// schoolname
// year
// address
// courses

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
    course: ''
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
  }

  const $v = useVuelidate(rules, student)



  return {student, $v}
}
