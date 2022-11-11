const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const passport = require('passport');
const { User } = require('./models');

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

passport.use(
	new LocalStrategy(function (username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}
			if (!user.verifyPassword(password)) {
				return done(null, false);
			}
			return done(null, user);
		});
	})
);

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

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});
