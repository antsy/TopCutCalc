/**
 * Calculate guesstimate distribution of players in different scores.
 *
 * @param  int  playerCount    Total number of players in the tournament.
 * @param  int  swissRounds    How many rounds of swiss will be played.
 * @param  int  topCut         How many players make it throught. If ommitted, assumes everyone will.
 */
const calculate = (playerCount, swissRounds, topCut) => {
  if (typeof topCut === 'undefined') {
    topCut = playerCount;
  }
  let result = [];
  let total = 0
  for (let i = 0;i<swissRounds;i++) {
    const howManyPlayers = (playerCount / Math.pow(2, swissRounds)) * doSomeMath(i, swissRounds);
    total += howManyPlayers;
    result.push(howManyPlayers);
    if (total > topCut) {
      return result;
    }
  }
  return result;
}

const doSomeMath = (i, swissRounds) => {
  const r = Array.from({length:i}, (v, k) => k+1); // create range(1...rounds)

  return r.reduce((a, c) => { let d = (swissRounds - c + 1); return a * d / c; }, 1);
}

/**
 * Put results in human readable table
 */
const getTable = (result, swissRounds) => {
  const r = Array.from({length:result.length}, (v, k) => k); 
  const resultTable = r.map(i => { return {record: `${swissRounds-i} - ${i}`, howMany: result[i]}; })

  //console.table(resultTable);
  return resultTable;
}

