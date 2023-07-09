<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartData: {
      default: () => ({
        labels: [ 'January', 'February', 'March', 'February', 'March' ],
        datasets: [
          {
            data: [40, 20, 12, 20, 12], backgroundColor: ['#2196F3', '#2196F3', '#2196F3'], borderRadius: 5, barThickness: 185,
          }
        ]
      }),
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        plugins: {
          tooltip: {
              callbacks: {
                  label: function(context: any) {
                      let label = context.dataset.label || '';

                      if (label) {
                          label += ': ';
                      }

                      if (context.parsed.y !== null) {
                          label += new Intl.NumberFormat('en-US').format(context.parsed.y);
                          label += '/550h'

                      }
                      return label;
                  }
              }
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            display: false,
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
      }
    }
  }
}
</script>
