import { computed, reactive, ref } from "vue"
import { required, sameAs, helpers } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import { useRouter } from "vue-router"
import { api } from "@/utils"
import { useUserStore } from "@/stores/user"
import { storeToRefs } from "pinia"

export default () => {
  const router = useRouter()
  const isLoading = ref(false)
  const showChangePassword = ref(false)
  const $externalResults  = ref({})
  const password = reactive({
    old_password: '',
    new_password: '',
    password_confirmation: '',
  })
  const rules = {
    old_password: {required},
    new_password: {required},
    password_confirmation: {required, same: helpers.withMessage('The password confirmation should match in new password!',sameAs(computed(() => password.new_password)))},
  }


  const $v = useVuelidate(rules, password, {$externalResults})

  const submit = async () => {
    if(!await $v.value.$validate()){
      return
    }

    isLoading.value = true
    try {
      const {user, token} = storeToRefs(useUserStore())
      const response = await api.put('/change-password', {...password})
      user.value = response.data
      localStorage.setItem('userData', JSON.stringify({user: user.value, token: token.value}))
      showChangePassword.value = false;
      clear();
      isLoading.value = false
      return response
    } catch (error) {
      //@ts-ignore
      $externalResults.value = error.response.data.errors
      isLoading.value = false
      return error
    }
  }

  const clear = () => {
    password.new_password = ''
    password.old_password = ''
    password.password_confirmation = ''

    $v.value.$reset()
  }

  return {showChangePassword, password, $v, submit, clear, isLoading}
}
