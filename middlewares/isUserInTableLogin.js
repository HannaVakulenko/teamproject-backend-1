const db = require("../config/db");

const isUserInTableLogin = async (req, res, next) => {
  const { body } = req;

  const result = await db.query(
    "SELECT COUNT(*) as count FROM NewTable WHERE email = ?",
    [body.email],
    (error, results, fields) => {
      if (error) {
        console.error("Ошибка при выполнении запроса:", error);
      } else {
        next();
      }

      //   const count = results[0].count;

      //   if (count === 0) {
      //     console.log("Новый юзер.");
      //   }
    }
  );
  return result;
};

module.exports = isUserInTableLogin;
