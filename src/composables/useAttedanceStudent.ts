import { useAttendanceStore } from "@/stores/attendance";
import { Student, useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useStudent from "./useStudent";

export default (student: Student) => {
  const router = useRouter()
  const $attendance = useAttendanceStore();
  const isLoading = ref(false);
  const showPolicyConfirmation = ref(false);
  const enter = () => {
    const currentTime = new Date();
    const now = new Date();
    now.setHours(9);
    now.setMinutes(15);

    if (currentTime > now && !showPolicyConfirmation.value) {
      showPolicyConfirmation.value = true;

      return;
    }

    isLoading.value = true;
    $attendance.enter(student.id).then(() => {
      isLoading.value = false;
      showPolicyConfirmation.value = false;
    });
  };
  const leave = (student_id: number, attendance_id: number) => {
    isLoading.value = true;
    $attendance.leave(student_id, attendance_id).then(() => {
      isLoading.value = false;
      const {students} = storeToRefs(useStudentStore())
      const student = students.value.find(item => item.id == student_id)
      if(student){
        const studentRef = ref(student)
        const {work_time_total} = useStudent(studentRef)
        if(work_time_total.value.hours >= parseInt(student.remaining)){
          router.push({query: {type: 'completed', name: student.first_name + ' ' + student.last_name}})
        }
      }
    });

  };
  const absent = () => {
    isLoading.value = true;
    $attendance.absent(student.id).then(() => {
      isLoading.value = false;
    });
  };
  const enterWithPolicy = () => {
    isLoading.value = true;
    $attendance.enterWithPolicy(student.id).then(() => {
      isLoading.value = false;
      showPolicyConfirmation.value = false;
    });
  };

  const removeAttendance = () => {
    const {student} = storeToRefs(useStudentStore())
    const $attendance = useAttendanceStore()
    if(!student.value.attendance){
      return
    }
    isLoading.value = true
    $attendance.remove(student.value.id, student.value.attendance.id).then(() => isLoading.value = false)
  }



  return {enter, leave, absent, enterWithPolicy, showPolicyConfirmation, isLoading, removeAttendance, }
}
