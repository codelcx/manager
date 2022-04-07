<template>
<div class='chart'>
  <el-card>
    <bread>
      <template #value2>数据统计</template>
      <template #value3>数据报表</template>
    </bread>
    <div id="main" style="width:600px;height:710px;margin:0 auto"></div>
  </el-card>

</div>
</template>

<script>
import * as echarts from 'echarts';
import Bread from '../../components/content/Bread.vue'
export default {
  name: 'chart',
  components: {
    Bread
  },
  data() {
    return {
      option: {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [{
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [{
              value: 1048,
              name: 'Search Engine'
            },
            {
              value: 735,
              name: 'Direct'
            },
            {
              value: 580,
              name: 'Email'
            },
            {
              value: 484,
              name: 'Union Ads'
            },
            {
              value: 300,
              name: 'Video Ads'
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    }
  },

  mounted() {
    this.setChart()
  },
  methods: {
    setChart() {
      let chartDom = document.getElementById('main');
      let myChart = echarts.init(chartDom);
      myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped>

</style>
