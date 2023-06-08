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
    first_name: 'Joshua',
    last_name: 'Sotto',
    gender: 'male',
    email: 'joshua@example.example',
    phone_number: '092839829',
    school_name: 'Arellano University - Jose Rizal Campus',
    school_year: '2022-2023',
    address: 'Sitio Sto. nino Concepcion Malabon City',
    course: 'BSCS'
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
