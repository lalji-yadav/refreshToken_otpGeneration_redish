const express = require('express')
var jwt = require('jsonwebtoken');
const app = express()
const bodyParser = require('body-parser');

const port = 3001

console.log('connected--')

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Generate an access token and a refresh token when the user logs in
const accessToken = jwt.sign({ username: 'user123' }, 'access_secret', { expiresIn: '10m' });
const refreshToken = jwt.sign({ username: 'user123' }, 'refresh_secret', { expiresIn: '1h' });

console.log('refresh-token',refreshToken )

// When the access token expires, use the refresh token to generate a new access token
app.post('/refresh-token', (req, res) => {
  var refreshToken = req.body.refreshToken;

  console.log('aaaa', req.body)

  jwt.verify(refreshToken, 'refresh_secret', (err, decoded) => {
    if (err) {
      // Handle invalid refresh token
      res.status(401).send('Invalid refresh token');
    } else {

      console.log('decoded token---', decoded)

      const accessToken = jwt.sign({ username: decoded.username }, 'access_secret', { expiresIn: '10m' });
      res.send({ accessToken });
    }
  });
});




app.listen(port, ()=>{
    console.log('server is created')
})
