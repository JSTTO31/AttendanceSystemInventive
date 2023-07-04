import useVuelidate from "@vuelidate/core"
import { required, numeric, email, maxLength, minLength } from "@vuelidate/validators"
import { reactive } from "vue"

export default () => {
  const student = reactive({
    first_name: 'Joshua',
    last_name: 'Sotto',
    gender: 'male',
    email: 'joshuasotto@example.example',
    phone_number: '09231238471',
    school_name: 'AU',
    school_year: '2022-2023',
    address: 'Malabon City',
    course: 'BSCS',
    remaining: 550,
    position: 'Web Developer'
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
