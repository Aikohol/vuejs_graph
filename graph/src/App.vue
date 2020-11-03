ux<template>
  <div>
    <!-- <h1>Working Times Dashboard</h1>
    <h2>{{ datasets.username }}</h2>
    <h3>{{ datasets.email }}</h3> -->
    <doughnut-chart :data="doughnutData" :options="doughnutOptions" :height="50" />
    <bar-chart :data="barChartData" :options="barChartOptions" :height="100" />
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
          "start": "2012-04-28T06:25:43.511Z",
          "end": "2012-04-28T23:25:43.511Z"
        },
        {
          "start": "2012-05-01T10:25:43.511Z",
          "end": "2012-05-01T12:25:43.511Z"
        },
        {
          "start": "2012-05-02T10:25:43.511Z",
          "end": "2012-05-02T14:25:43.511Z"
        },
        {
          "start": "2012-05-02T15:25:43.511Z",
          "end": "2012-05-02T17:25:43.511Z"
        },
      ]
    }
    var week_nbr = 0
    const max_hour = 35
    var weeks = []
    var i = 0;
    let week = [];
    var last_day = 0
    var day_nbr =  0
    while(i != datasets.workingtimes.length) {
      let workingtime = datasets.workingtimes[i]
      let start = new Date(workingtime.start)
      let end = new Date(workingtime.end)
      day_nbr = new Date(workingtime.start).getDay() - 1
      week[day_nbr] = week[day_nbr] > 0
        ? week[day_nbr] + (end - start) / (1000 * 3600)
        : (end - start) / (1000 * 3600)
      if (last_day > day_nbr || i != datasets.workingtimes.length - 1) {
        if(day_nbr > new Date(datasets.workingtimes[i+1].start).getDay() - 1) {
          weeks.push(week)
          last_day = 0
          week = []
        }
      } else {
        last_day = day_nbr
      }
      i++;
    }
    weeks.push(week)
    var week_total = {
      total: 0
    }
    for(var j = 0; j != weeks[week_nbr].length; j++) {
      if(weeks[week_nbr][j] != undefined) {
        console.log(weeks[week_nbr][j])
        week_total["total"] += weeks[week_nbr][j]
      }
    }
    week_total["over_time"] = (week_total["total"] - max_hour > 0) ? week_total["total"] - max_hour : 0
    week_total["normal_time"] = week_total["total"] - week_total["over_time"]
    console.log("total", week_total)
    return {
      datasets: datasets,
      doughnutData: {
        total: week_total["total"],
        labels: [
          'Normal Hours',
          'Overtime Hour',
          'Night Hour',
        ],
        datasets: [
          {
            data: [week_total["normal_time"], week_total["over_time"], 10],
            backgroundColor: ['#007ace', '#de3618', '#7b56c7'],
          }
        ]
      },
      doughnutOptions: {
        responsive: true,
        legend: {
        },
        title: {
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
      },
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
            data: weeks[week_nbr],
            backgroundColor: '#007ace',
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Working Times Dashboard for ' + datasets.username,
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ]
        }
      }
    }
  }
}
</script>
