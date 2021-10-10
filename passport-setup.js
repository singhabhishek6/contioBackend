const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "493953240158-279bfjklkcsth3btgtmn2th1f84qvuif.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile)
    }
  )
)
