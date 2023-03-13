const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express()
const bodyParser = require('body-parser');
const db = require("./db-config");
const logger = require('morgan');

//Routers
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const changePasswordRouter = require('./routes/newPassword');

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static('public'))
app.use(logger('dev'))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/', homeRouter);
app.use('/newPassword', changePasswordRouter);

// Connect to the database using the connect method
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.info(`Server is listening on port ${port}`);
});
