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
import { Line as LineChart,  } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default{
  components: { LineChart },
  props: {
    data: {
      default: () => ({
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
          {
            backgroundColor: "#2196F3",
            borderJoinStyle: "round",
            borderColor: "#2196F3",
            tension: 0.5,
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      }),
      type: {} as any
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
