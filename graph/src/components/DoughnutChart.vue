<script>
import { Doughnut } from 'vue-chartjs'
import Chart from "chart.js";
export default {
  extends: Doughnut,
  name: "Doughnut",
  props: ['data', 'options', 'total'],
  mounted () {
    this.renderChart(this.data, this.options)
    this.textCenter(this.data.total+"H");
  },
  methods: {
    textCenter(val) {
      Chart.pluginService.register({
        beforeDraw: function(chart) {
          var width = chart.chart.width;
          var height = chart.chart.height;
          var ctx = chart.chart.ctx;

          ctx.restore();
          var fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          var text = val;
          var textX = Math.round((width - ctx.measureText(text).width) / 2);
          var textY = height / 1.7;

           ctx.fillText(text, textX, textY);
           ctx.save();
         }
       });
       Chart.plugins.unregister(this.chartdata);
     }
   }
};
</script>
