const express = require('express');
const path = require('path');
const app = express();


app.use(require('prerender-node').whitelisted(['/', '/team']).set('prerenderToken', 'jwRjNODX8wddZb1cY2qZ'));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
