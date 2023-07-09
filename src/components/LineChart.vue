<template>
  <LineChart :data="data" :options="options" style="height: 100%" />
</template>

<script lang="ts" >
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
  //@ts-ignore
import { Line as LineChart } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Data{
  labels: String[],
  datasets: Record<string, any>,

}

export default{
  components: { LineChart },
  props: {
    //@ts-ignore
    data: {
      type: {} as Data,
      default: () => ({
        labels: ["Day 1", "Day 2", "Day3", "Day4", "Day5", "Day6", "Day7"],
        datasets: [
          {
            backgroundColor: "#2196F3",
            borderJoinStyle: "round",
            borderColor: "#2196F3",
            tension: 0.5,
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      })
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            display: false,
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      })
    }
  },
}

</script>
