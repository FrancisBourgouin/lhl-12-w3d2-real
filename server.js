const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();

const logPayload = (req, res, next) => {
  console.log('Request parameters:');
  console.log('-'.repeat(30));
  console.log('Method:', req.method);
  console.log('Url:', req.url);
  console.log('req.params:', req.params);
  console.log('req.body:', req.body);
  console.log('-'.repeat(30));
  next();
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logPayload);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
