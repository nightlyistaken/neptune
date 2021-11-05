import { green, cyan } from "chalk";
import { Client } from "discord.js";
import fs from "fs";
import deploy from "../deploy";

export = {
  name: "ready",
  once: true,
  execute(client: Client) {
    const commandFiles = fs
      .readdirSync("./src/commands/")
      .filter((file) => file.endsWith(".ts"));
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      (client as any).commands.set(command.data.name, command);
    }

    console.info(green(`Loaded ${commandFiles.length} commands`));
    console.log(cyan("Ready to use! Issues? Report here!"));
    console.log(cyan("https://github.com/dhairy-online/neptune/issues/new"));
    console.info(`Connected as ${cyan(client.user?.tag)}`);
    
    deploy();

    let reStats = true;
    setInterval(() => {
      if (reStats) {
        client.user?.setActivity(`/help`, {
          name: "neptune",
          type: "LISTENING",
        });
      } else {
        client.user?.setActivity(`Github Repositories`, {
          name: "neptune",
          type: "WATCHING",
        });
      }

      reStats = !reStats;
    }, 10000);
  },
};
