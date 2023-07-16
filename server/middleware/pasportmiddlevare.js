import dotenv from "dotenv";
dotenv.config();
import { User } from "../Models/index.js";
import pkg from "mongoose";
const { Types } = pkg;
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_SECRET,
};

export const passportMiddleware = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      // eslint-disable-next-line no-underscore-dangle
      const id = Types.ObjectId(jwtPayload._id);
      User.findById(id, (err, user) => {
        if (err) {
          console.log(err);
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};
