const express = require('express');
const cors = require('cors');
require('./DB/mongoose.connect');

const app = express();
app.use(express.json());
app.use(cors());
const routes = require('./routes/index.route');

app.use(express.static('dist'));


app.use('/api/', routes);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
