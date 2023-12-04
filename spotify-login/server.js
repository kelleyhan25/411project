const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost/spotify_login', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Express session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Passport.js initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport Spotify Strategy configuration
passport.use(new SpotifyStrategy({
  clientID: 'e51ffa0600ca4164a0f6bb555f58d8d1',
  clientSecret: '21d145f5d2c642f482b269f00e271465',
  callbackURL: 'https://kelleyhan25.github.io/411project/', 
}, async (accessToken, refreshToken, expires_in, profile, done) => {
  try {
    let user = await User.findOne({ spotifyId: profile.id });

    if (!user) {
      user = new User({
        spotifyId: profile.id,
        displayName: profile.displayName,
      });
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/login-spotify', passport.authenticate('spotify', { scope: ['user-read-email'] }));

app.get('/callback', passport.authenticate('spotify', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/profile');
});

app.get('/profile', (req, res) => {
  res.send(req.user);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});