const { app, sequelize } = require("./");

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  sequelize.sync({ force: false });
  console.log(`Dogs are ready at http://localhost:${PORT}`);
});
