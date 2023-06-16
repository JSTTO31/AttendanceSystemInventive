<template>
  <Line :data="data" :options="options" style="height: 100%" />
</template>

<script lang="ts" setup>
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
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Day 1", "Day 2", "Day3", "Day4", "Day5", "Day6", "Day7"],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#2196F3",
      borderJoinStyle: "round",
      borderColor: "#2196F3",
      tension: 0.5,
      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
};

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
};
</script>
