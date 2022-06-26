<template>
  <div class="small">
    <VueApexCharts
      type="line"
      height="350"
      ref="chart"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
  components: {
    VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: 'Infos',
          data: [1, 2, 36, 5, 8, 8],
        },
      ],
      chartOptions: {},
    };
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
