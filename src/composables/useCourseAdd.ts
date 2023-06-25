import useVuelidate from "@vuelidate/core"
import { required, numeric, minValue } from "@vuelidate/validators"
import { reactive } from "vue"


export default () => {
  const course = reactive({
    name: '',
    sub_category_id: -1,
    description: '',
    number_of_session: 1,
    image: '',
  })

  const rules = {
    name: { required },
    description: {},
    sub_category_id: { required, numeric },
    number_of_session: {},
    image: { required }
  }

  const $v = useVuelidate(rules, course)

  return {course, $v}
}
