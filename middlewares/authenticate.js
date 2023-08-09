const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");

const User = require("../models/user");

const { JWT_SECRET } = process.env;

const authenticate = async(req, res, next) => {
    const { authorization = "" } = req.headers;

    if (typeof authorization !== "string") {
        return res.status(401).json({ error:  "No token provided" });
      }

    const [bearer, token] = authorization.split(" ", 2);
    // checking for the "Bearer" in Headers
    if (bearer !== "Bearer") {
        next(HttpError(401, 'Not authorized'));
    }

    jwt.verify(token, JWT_SECRET, async (err, decode) => {
        // token error checking: "TokenExpiredError" "JsonWebTokenError"
        if (err) {
          if (
            err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError"
          ) {
            return res.status(401).json({ error: "Token Error" });
          }
    
          return next(err);
        }
    
        // user token validation
        try {
            const { id } = jwt.verify(token, JWT_SECRET);
            const user = await User.findById(id);
            if (!user || !user.token) {
                next(HttpError(401, 'Not authorized'));
            }
            req.user = user;
            next();
        } catch {
            next(HttpError(401, 'Not authorized'));
        }
      });
      
}

module.exports = authenticate;