<template>
  <div>
    <!-- <h1>Working Times Dashboard</h1>
    <h2>{{ datasets.username }}</h2>
    <h3>{{ datasets.email }}</h3> -->
    <bar-chart :data="barChartData" :options="barChartOptions" :height="200" />
  </div>
</template>


<script>
export default {
  data() {
    var datasets = {
      "id": 1,
      "username": "Cthulhu",
      "email": "cthulhurulerofearth@r'yleh.org",
      "workingtimes": [
        {
          "start": "2012-04-23T08:25:43.511Z",
          "end": "2012-04-23T18:25:43.511Z"
        },
        {
          "start": "2012-04-24T08:25:43.511Z",
          "end": "2012-04-24T16:25:43.511Z"
        },
        {
          "start": "2012-04-25T10:25:43.511Z",
          "end": "2012-04-25T15:25:43.511Z"
        },
        {
          "start": "2012-04-27T10:25:43.511Z",
          "end": "2012-04-27T17:25:43.511Z"
        },
        {
          "start": "2012-05-01T10:25:43.511Z",
          "end": "2012-05-01T12:25:43.511Z"
        },
      ]
    }
    var weeks = []
    var i = 0;
    let week = [];
    var last_day = 0
    while(i != datasets.workingtimes.length) {
      var workingtime = datasets.workingtimes[i]
      var start = new Date(workingtime.start).getTime()
      var end = new Date(workingtime.end).getTime()
      var day_nbr = new Date(workingtime.start).getDay() - 1

      week[day_nbr] = week[day_nbr] == undefined ? (end - start) / (1000 * 3600) : week[day_nbr] + (end - start) / (1000 * 3600)

      console.log("i :", i)
      console.log("day :", day_nbr)
      console.log("last_day :", last_day)
      console.log("week? :", week)

      if(last_day > day_nbr || day_nbr == 6 || i == datasets.workingtimes.length - 1) {
        console.log("END OF THE WEEK")
        console.log("week end of week :", week)
        weeks.push(week)
        week = []
      }

      console.log(i < datasets.workingtimes.length)

      last_day = day_nbr
      i++;
    }
    console.log(i < datasets.workingtimes.length)
    console.log(weeks)
    return {
      datasets: datasets,
      barChartData: {
        labels: [
          'Monday',
          'Tuesday',
          'Wednesay',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        datasets: [
          {
            label: 'Working Times',
            data: weeks[0],
            backgroundColor: 'dark-blue',
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        legend: {
          // display: true
        },
        title: {
          display: true,
          // text: 'Working Times Dashboard',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        // tooltips: {
        //   // backgroundColor: '#17BF62'
        // },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    }
  }
}
</script>
