import { Student } from "@/stores/student";
import { Ref, computed } from "vue";

export default (student: Ref<Student>) => {
  const timeIn = computed(() =>
  student.value.attendance && student.value.attendance.time_in
    ? new Date(student.value.attendance.time_in).toLocaleTimeString("en-us", {
        minute: "2-digit",
        hour: "2-digit",
      })
    : "--"
  );
  const timeOut = computed(() =>
    student.value.attendance && student.value.attendance.time_out
      ? new Date(student.value.attendance.time_out).toLocaleTimeString("en-us", {
          minute: "2-digit",
          hour: "2-digit",
        })
      : "--"
  );
  const workTime = computed(() =>
    student.value.attendance &&
    student.value.attendance.time_in &&
    student.value.attendance.time_out
      ? student.value.attendance.work_time + "h"
      : "--"
  );
  const status = computed(() => {
    if(!student.value.attendance){
      return 'pending'
    }
    return student.value.attendance.is_absent ? 'absent' : !!student.value.attendance.late_time ? 'late' : student.value.attendance.is_event ? 'event' : 'present'
})

  return {timeIn, timeOut, workTime, status}
}
