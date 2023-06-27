import { Course } from "@/stores/course"
import useVuelidate from "@vuelidate/core"
import { required, numeric, minValue } from "@vuelidate/validators"
import { reactive } from "vue"


export default (course: Course) => {
  const edit = reactive({
    name: course.name,
    sub_category_id: course.sub_category_id,
    description: course.description,
    number_of_session: course.number_of_session,
    image: '',
    url: course.image
  })

  const rules = {
    name: { required },
    description: {},
    sub_category_id: { required, numeric },
    number_of_session: {required},
    image: {}
  }

  const $v = useVuelidate(rules, edit)

  return {edit, $v}
}
