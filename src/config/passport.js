const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = process.env.JWT_SECRET;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
  // Hier kannst du die Benutzerdaten überprüfen und den Benutzer zurückgeben
  const user = getUserFromDatabase(jwtPayload.sub); // Beispiel: Hole Benutzer aus der Datenbank
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));

module.exports = passport;
