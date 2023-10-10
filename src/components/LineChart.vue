<template>
  <LineChart :data="data" :options="options" style="height: 100%" />
</template>

<script lang="ts"  setup>
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
import { Line as LineChart} from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps(['data'])
const options = {
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
      }
</script>
