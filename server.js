const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const uuid = require('uuid/v4'); // What is that ?
const app = express();
const methodOverride = require('method-override'); // What is that ?

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// specify the static asset folder (css, images, etc)
app.use(express.static('public'));

// using ejs for the views
app.set('view engine', 'ejs');

const superSmashBrosMatches = {
  "affa4922-20ab-4784-ace4-4702d83ac68c":{
    players:["Lucas","Francis"],
    stage:"Final destination",
    comments:"Fox only no items"
  },
  "ccb5d10f-428f-411e-a22b-2e08e6f62c74":{
    players:["Lucas","Francis","Slav"],
    stage:"Final destination",
    comments:"Fox only no items"
  },
  "a6836c87-5be5-4489-823e-0d4c77db7e57":{
    players:["Mikel","Jeff"],
    stage:"Final destination",
    comments:"Fox only no items"
  },
  "57d3ca39-c166-43d5-9dac-2ae1b84b7900":{
    players:["Cassie","Chantale"],
    stage:"Final destination",
    comments:"Fox only no items"
  }
}

const quarterFinalsMatchesOfLHL = [
  "affa4922-20ab-4784-ace4-4702d83ac68c",
"ccb5d10f-428f-411e-a22b-2e08e6f62c74",
"a6836c87-5be5-4489-823e-0d4c77db7e57"
]

const prepareDataForMatchList = (matches, quarterfinals) => {

  //We will modify the original object ! Beware !

  for (const matchId in matches){
    let playerString = "The players are :"
    for (const playerName of matches[matchId].players) {
      if(playerName !== matches[matchId].players[matches[matchId].players.length - 1]){
        playerString += ` ${playerName},`
      }
      else{
        playerString += ` ${playerName}.`
      }
    }
    matches[matchId].playerString = playerString
  }

  for (const matchId of quarterfinals) {
    matches[matchId].round = "Quarterfinals"
  }

  return matches
}

app.get('/', (req, res) => {
  const matchesT = prepareDataForMatchList(superSmashBrosMatches, quarterFinalsMatchesOfLHL)
  const templateVars = {matches: matchesT}
  console.log(superSmashBrosMatches)
  res.render('matchlist', templateVars);
})

app.put('/matches/quarterfinals/:idOfMatch', (req, res) => {
  quarterFinalsMatchesOfLHL.push(req.params.idOfMatch)
  console.log(quarterFinalsMatchesOfLHL)
  // res.send('OK')
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
