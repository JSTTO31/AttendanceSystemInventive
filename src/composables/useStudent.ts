import { Student } from "@/stores/student";
import { Ref, computed, ref } from "vue";

export default (student: Ref<Student>) => {
  const remainingMode = ref(false);
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
    student.value.attendance.work_time != null
      ? parseFloat(student.value.attendance.work_time).toFixed(2) + "h"
      : "--"
  );
  const status = computed(() => {
    if(!student.value.attendance){
      return 'pending'
    }
      return student.value.attendance.is_absent ? 'absent' : student.value.attendance.late_time != null ? 'late' : student.value.attendance.is_event ? 'event' : 'present'
  })

  const work_time_total= computed(() => {
    const total_hours = student.value.attendances.slice().reduce((sum, item) => sum += !item.work_time ? 0 : Math.floor(parseInt(item.work_time)), 0)
    const total_minutes = student.value.attendances.slice().reduce((sum, item, index) => {
      if(!item.work_time){
        return sum
      }
      return sum += Math.floor(parseInt(parseFloat(item.work_time).toFixed(2).split('.')[1]))
    }, 0)

    let output = `Time render ${total_hours + Math.floor(total_minutes / 60)} hours & ${total_minutes % 60} minutes`

    if(remainingMode.value){
      console.log(parseInt(student.value.remaining));

      const hours = parseInt(student.value.remaining) - (total_hours + Math.floor(total_minutes / 60))
      const minutes = 60 - (total_minutes % 60)
      output = `Time remaining ${hours} hours & ${minutes} minutes`
    }



    return {
      hours: total_hours + Math.floor(total_minutes / 60),
      minutes: total_minutes % 60,
      output: output
    }
  })

  const remainingPercent = computed(
    // @ts-ignore
    () => ((work_time_total.value.hours / student.value.remaining) * 100 )
  );



  return {timeIn, timeOut, workTime, status, remainingPercent, work_time_total, remainingMode}
}
