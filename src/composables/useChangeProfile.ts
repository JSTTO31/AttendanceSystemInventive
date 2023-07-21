import { useStudentStore } from "@/stores/student"
import { ref, watch } from "vue"
import { useRouter } from "vue-router"


export default () => {
  const image = ref(null)
  const showApplyImageDialog = ref(false)
  const router = useRouter()

  const applyImage = () => {
    if(!image.value){
      return
    }
    const $student = useStudentStore()
    $student.changeProfile(image.value).then(() => {
      router.push({query: {success: 'true', message: 'Successfully change profile!'}})
    })
    showApplyImageDialog.value = false

  }
  const cancelImage = () => {
    showApplyImageDialog.value = false
    image.value = null
  }
  watch(() => image.value, () => {
    if(image.value){
      showApplyImageDialog.value = true
    }
  })

  return {image, applyImage, cancelImage, showApplyImageDialog}
}
