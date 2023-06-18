import { computed, ref } from "vue";



export default (start_at: any) => {

  const timeStart = new Date();
  timeStart.setHours(9);
  timeStart.setMinutes(16);
  const timeEnd = new Date();
  timeEnd.setHours(18);

  if(start_at){
    console.log('triggered');

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
    option: "present",
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

  return {attendance, isLoading, enablePolicy, options, followDate}
}
