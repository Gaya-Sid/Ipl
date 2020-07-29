function matchesPlayedPerYear(matches) {
  const result = {};
  for (let match of matches) {
    const season = match.season;
    if (result[season]) {
      result[season] += 1;
    } else {
      result[season] = 1;
    }
  }
  return result;
}

function matchesWonEachYear(matches) {
  let teams = [...new Set(matches.map( m => m.winner))];
  let years = [...new Set(matches.map( m => m.season))].sort();
  let data = matches.map( m => [m.winner, m.season]);

  function getWins(team, year, data){
    let x = data.filter(t => t[0] === team);
    let y = x.filter( t => t[1] === year);
    return y
  }
  
  let result = teams.map(team => {
    let res = {};
    let arr = [];
    if(team === ''){
      res["noResult"] = arr;
    }else{
      res[team] = arr;
    }
    years.forEach(year => {
      if(team === ''){
        arr.push(["year", getWins(team, year, data).length]);
        // res["noResult"][year] =  getWins(team, year, data).length;
      }else{
        arr.push([year, getWins(team, year, data).length]);
        // res[team][year] = getWins(team, year, data).length;
      }
    })
    return res
  })
  return result;
}

// For the year 2016, plot the extra runs conceded by each team.
function extraRuns(deliveries, matches) {  
  let years = [...new Set(matches.map( m => m.season))].sort();
  let data = {};

  // data[year] = getExtraRuns(deliveries, matches, year);

 
  years.forEach(year => {
    data[year] = getExtraRuns(deliveries, matches, year);
  })

  console.log(data);
  function getExtraRuns(deliveries, matches, year){
    let yearData = matches.filter(m => m.season === year)
      .map( m => [[m.team1, m.team2], m.id, ])
    let ids = matches.filter(m => m.season === year).map( m => m.id )
    let teams = [...new Set(yearData.map( m => m[0][0]))];
    let arr = [];
    let res = [];

    ids.forEach( id => {
      teams.forEach(team => {
        arr.push([team, getRuns(id, team)])
      })
    })

    function getRuns(id, team) {
      let runs = 0;
      deliveries.filter(m => m["match_id"] === id)
        .filter(t => t["bowling_team"] === team)
        .forEach( x => runs += parseInt(x["extra_runs"]) );
      return runs
    }

    teams.forEach( t => {
      let sum = 0;
      arr.filter(m => m[0] === t).forEach(v => {
        sum += parseInt(v[1]);
      })
      res.push({[t]: sum});
    })

    // console.log(res)
    return res
  }
  return data
 }

 function topEconomicalBowlers(deliveries, matches) {
  // For the year 2015, plot the top 10 economical bowlers along with their economy rates.
  let data = getDataForYear(deliveries, matches , "2015");

  // get bowlers of 2015
  let bowlers = [...new Set(data.map(d => d["bowler"]))].sort();
  // console.log(bowlers);

  let stats = bowlers.map( b => {
    return data.filter(d => d["bowler"] === b)
      .map(m => [ b, m["ball"], m["total_runs"], m["wide_runs"], m["noball_runs"], m["legbye_runs"]])
  })

  stats = stats.map(bowler => {
    let balls = bowler.length;
    let runs = 0;
    let wide = 0;
    let noball = 0;
    let legbye = 0;
    
    bowler.forEach(delivery => {
      runs += parseInt(delivery[2]);
      if(delivery[3] !== '0'){
        wide++
      }
      if(delivery[4] !== '0'){
        noball++
      }
      if(delivery[5] !== '0'){
        legbye++
      }
    })
    balls = parseInt(balls) - parseInt(wide) - parseInt(noball)- parseInt(legbye);
    let overs = ((balls)/6).toFixed(2);
    let economy = (parseInt(runs)/overs).toFixed(2);
    // console.log(balls,overs, runs, wide, noball,bowler[0][0], economy)
    return {[bowler[0][0]]:  Number(economy)}
  }).sort( (a,b) => Object.values(a) - Object.values(b));
  
  return stats.splice(0,10)
 }


// Discuss a "Story" you want to tell with the given data.
// Matches won by each team per venue
function matchesWonPerVenue(deliveries, matches){
  let teams = [...new Set(matches.map( m => m.winner))];
  let venues = [...new Set(matches.map( m => m.venue))].sort();
  let data = matches.map( m => [m.winner, m.venue]);

  function getWins(team, venue, data){
    let x = data.filter(t => t[0] === team);
    let y = x.filter( t => t[1] === venue);
    return y
  }
  
  let result = teams.map(team => {
    let res = {};
    let arr = [];
    if(team === ''){
      res["noResult"] = arr;
    }else{
      res[team] = arr;
    }
    venues.forEach(venue => {
      if(team === ''){
        arr.push([venue, getWins(team, venue, data).length]);
      }else{
        arr.push([venue, getWins(team, venue, data).length]);
      }
    })
    // console.log(res)
    return res
  })
  return result;
}

// filter data for the year
function getDataForYear(deliveries, matches , year){
  // get ids of matches in 2015
  let ids = matches.filter(m => m.season === year).map( m => m.id );
  // get data for relevant year
  let data = [];
  ids.forEach( id => {
    data.push(...deliveries.filter(d => d["match_id"] === id))
  });
  return data
}

module.exports = { 
  matchesPlayedPerYear , 
  matchesWonEachYear, 
  extraRuns, 
  topEconomicalBowlers, 
  matchesWonPerVenue 
};
