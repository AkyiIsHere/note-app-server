const app = require("./app");
const connetToDB = require("./src/config/db.config");

const port = process.env.PORT || 5000;

connetToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on PORT:${port}...`);
    });
  })
  .catch((err) => console.log(err));
