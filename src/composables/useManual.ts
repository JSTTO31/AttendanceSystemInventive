import { useAttendanceStore } from "@/stores/attendance";
import { useStudentStore } from "@/stores/student";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";



export default (start_at: any) => {
  const timeEnd = new Date();
  const timeStart = new Date();
  const month = new Date(start_at).getMonth()
  const date = new Date(start_at).getDate()
  const {student} = storeToRefs(useStudentStore())
  const exists = student.value.attendances.find(item => {
    return new Date(item.created_at).getMonth() == month && new Date(item.created_at).getDate() == date
  })

  if(exists && !!exists.time_in && !!exists.time_out){
    const time_in = new Date(exists.time_in)
    const time_out = new Date(exists.time_out)
    timeStart.setHours(time_in.getHours());
    timeStart.setMinutes(time_in.getMinutes());
    timeStart.setSeconds(time_in.getSeconds());
    timeEnd.setHours(time_out.getHours());
    timeEnd.setMinutes(time_out.getMinutes());
    timeEnd.setSeconds(time_out.getSeconds());
  }

  if(!exists){
    timeStart.setHours(9);
    timeStart.setMinutes(0);
    timeStart.setSeconds(0);
    timeEnd.setHours(18);
  }

  if(start_at){
    const currentDate = new Date(start_at)
    timeStart.setFullYear(currentDate.getFullYear())
    timeStart.setMonth(currentDate.getMonth())
    timeStart.setDate(currentDate.getDate())
    timeEnd.setFullYear(currentDate.getFullYear())
    timeEnd.setMonth(currentDate.getMonth())
    timeEnd.setDate(currentDate.getDate())
  }

  const attendance = ref({
    time_in: timeStart,
    time_out: timeEnd,
    option: exists && exists.is_absent ? 'absent' : exists && exists.policy ? 'policy' : 'present',
    allow_relogin: false,
    break: true
  });

  const isLoading = ref(false);

  const enablePolicy = computed(() => {
    const timeLimit = new Date(attendance.value.time_in);
    timeLimit.setHours(9);
    timeLimit.setMinutes(15);
    if (timeLimit < attendance.value.time_in) {
      return true;
    }
    return false;
  });

  const options = [
    {
      value: "present",
      label: "Present",
      color: "primary",
    },
    {
      value: "absent",
      label: "Absent",
      color: "error",
    },
    {
      value: "policy",
      label: "Present with policy",
      color: "warning",
    },
  ];

  const followDate = (changed: string) => {
    if(changed == 'time_in'){
      const timeIn = new Date(attendance.value.time_in);
      const timeOut = new Date(attendance.value.time_out);
      timeOut.setFullYear(timeIn.getFullYear());
      timeOut.setMonth(timeIn.getMonth());
      timeOut.setDate(timeIn.getDate());
      attendance.value.time_out = timeOut;
    }else{
      const timeIn = new Date(attendance.value.time_in);
      const timeOut = new Date(attendance.value.time_out);
      timeOut.setFullYear(timeIn.getFullYear());
      timeOut.setMonth(timeIn.getMonth());
      timeOut.setDate(timeIn.getDate());
      attendance.value.time_out = timeOut;
    }
  }

  return {attendance, isLoading, enablePolicy, options, followDate, exists}
}
