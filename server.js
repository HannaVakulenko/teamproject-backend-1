// eslint-disable-next-line no-unused-expressions
require("dotenv").config;

const app = require("./app");

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
