import readline from "readline";
import fs from "fs";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("app", "root", "root", {
  host: "127.0.0.1",
  dialect: "mysql",
});

const insertUsers = async () => {
  await sequelize.authenticate();

  const file = readline.createInterface(fs.createReadStream("users.csv"));

  const users = [];

  file.on("line", async (line) => {
    users.push(line.split(","));
  });

  file.on("close", async () => {
    await sequelize.query({
      query: "INSERT INTO users (name, email) VALUES ?",
      values: [users],
    });
  });
};

insertUsers();
