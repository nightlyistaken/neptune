import { green, cyan, greenBright } from "chalk";
import fs from "fs";
import deploy from "../deploy";
import mainConfig from "../configs/main.config.json";
import botToken from "../configs/token.json";
module.exports = {
  name: "ready",
  once: true,
  execute(client: any) {
    const commandFiles = fs
      .readdirSync("./src/commands/")
      .filter((file: string) => file.endsWith(".ts"));
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      client.commands.set(command.data.name, command);
      console.info(
        greenBright(
          `Loaded ${command.data.name} with description:  ${command.data.description}`
        )
      );
    }
    let reStats = true;
    console.log(green("Loaded %s commands"), commandFiles.length);
    console.log(cyan("Ready to use! Issues? Report here!"));
    console.log(cyan("https://github.com/dhairy-online/neptune/issues/new"));
    deploy(mainConfig, botToken, client);
    setInterval(() => {
      if (reStats) {
        client.user?.setActivity(`Slash Commands`, {
          name: "nevagon",
          type: "LISTENING",
        });
      } else {
        client.user?.setActivity(`Github Repositories`, {
          name: "nevagon",
          type: "WATCHING",
        });
      }

      reStats = !reStats;
    }, 10000);
  },
};
