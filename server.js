const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const passport = require('passport');
const mySQL = require('mysql2');
const { User } = require('./models');
const indexRouter = require('./controllers/index');

// const bootstrap = require('bootstrap');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
	secret: 'We need to fix this later',
	cookie: {},
	resave: false, // don't save session if unmodified
	saveUninitialized: true, //
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));
app.use(passport.authenticate('session'));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use(
	'/css',
	express.static(path.join(__dirname + '/node_modules/bootstrap/dist/css'))
);
app.use(
	'/js',
	express.static(path.join(__dirname + '/node_modules/bootstrap/dist/js'))
);
app.use();

app.use('/', indexRouter);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});
