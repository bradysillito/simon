const express = require('express');
const app = express();

//Initialize the server port
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(express.static('public'));
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Get Scores
apiRouter.get('/scores', (req, res) => {
    res.send(scores);
});

// Submit Score
apiRouter.post('/scores', (req, res) => {
    scores = updateScores(req.body, scores);
    res.send(scores);
});

app.use((req, res) => {
    res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let scores = [];

function updateScores(newScore, scores) {
    let found = false;
    for (const [i, prevScore] of scores.entries()) {
        if (newScore.score > prevScore.score) {
            scores.splice(i, 0, newScore);
            found = true;
            break;
        }
    }

    if (!found) {
        scores.push(newScore);
    }

    if (scores.length > 10) {
        scores.length = 10;
    }

    return scores;
}