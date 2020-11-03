import Vue from 'vue'
import App from './App.vue'

import BarChart from './components/BarChart.vue';
import DoughnutChart from './components/DoughnutChart.vue';

Vue.config.productionTip = false
Vue.component('bar-chart', BarChart);
Vue.component('doughnut-chart', DoughnutChart);

new Vue({
  render: h => h(App),
}).$mount('#app')
