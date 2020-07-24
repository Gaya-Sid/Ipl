function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  console.log(data);
  visualizeMatchesPlayedPerYear(data[0].matchesPlayedPerYear);
  visualizematchesWonEachYear(data[1].matchesWonEachYear);
  visualizeExtraRunsConceded(data[2].extraRuns);
  visualizetopEconomicalBowlers(data[3].topEconomicalBowlers)
  visualizematchesWonPerVenue(data[4].matchesWonPerVenue)
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }
  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "1. Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Matches",
        data: seriesData
      }
    ]
  });
}

function visualizematchesWonEachYear (matchesWonEachYear) {
  let years = [];
  let result = [];
  matchesWonEachYear.forEach(m => {
    let obj = {};
    obj.name = Object.keys(m)[0];
    obj.data = Object.values(m).flat().map(v => v[1])
    result.push(obj)
    years.push(...Object.values(m).flat().map(v => v[0]))
  })

  Highcharts.chart('matchesWonEachYear', {
    chart: {
        type: 'column'
    },
    title: {
        text: "2. Number of matches won by each team over all the years of IPL"
    },
    subtitle: {
        text: 'Source: ipl.com'
    },
    xAxis: {
        categories: years,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Wins'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} Matches</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: result
  });
}

function visualizeExtraRunsConceded(extraRuns) {
  const seriesData = []; 
  extraRuns.forEach( a => {
    let res = Object.keys(a).concat(Object.values(a))
    seriesData.push(res);
  })

  Highcharts.chart("extraRunsConceded", {
    chart: {
      type: "column"
    },
    title: {
      text: "3. Extra runs conceded by each team in 2016"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category",
      labels: {
          rotation: -45,
          style: {
              fontSize: "14px",
              fontFamily: "Arial, Helvetica, sans-serif"
          }
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs"
      }
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: "Extra Runs",
        data: seriesData,
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: "#FFFFFF",
          align: "center",
          y: 25,
          style: {
              fontSize: "12px",
              fontFamily: "Arial, Helvetica, sans-serif",
          }
        }
      }
    ]
  });
}

function visualizetopEconomicalBowlers(topEconomicalBowlers) {
  const seriesData = []; 
  topEconomicalBowlers.forEach( a => {
    let res = Object.keys(a).concat(Object.values(a))
    seriesData.push(res);
  })

  Highcharts.chart("topEconomicalBowlers", {
    chart: {
      type: "column"
    },
    title: {
      text: "4. Top Economical Bowlers In 2015 Season"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy Rates"
      }
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: "Economy Rate",
        data: seriesData,
        dataLabels: {
          enabled: true,
          rotation: 0,
          color: "#FFFFFF",
          align: "center",
          y: 25,
          style: {
              fontSize: "12px",
              fontFamily: "Arial, Helvetica, sans-serif",
          }
        }
      }
    ]
  });
}

function visualizematchesWonPerVenue(matchesWonPerVenue) {
  console.log(matchesWonPerVenue)
   // [{
  //   name: 'Team',
  //   data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
  // },{...}]

 
  let venues = [];
  let result = [];
  matchesWonPerVenue.forEach(m => {
    let obj = {};
    obj.name = Object.keys(m)[0];
    obj.data = Object.values(m).flat().map(v => v[1])
    result.push(obj)
    venues.push(...Object.values(m).flat().map(v => v[0]))
  })
  console.log(result);
  console.log(...new Set(venues));


  Highcharts.chart('matchesWonPerVenue', {
    chart: {
        type: 'bar'
    },
    title: {
        text: "Matches Won Per Venue"
    },
    subtitle: {
        text: 'Source: ipl.com'
    },
    xAxis: {
        categories: venues,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Wins'
        }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: result
  });
}


