import Vue from 'vue'
import App from './App.vue'

import BarChart from './components/BarChart.vue';

Vue.config.productionTip = false
Vue.component('bar-chart', BarChart);

new Vue({
  render: h => h(App),
}).$mount('#app')
