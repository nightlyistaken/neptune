import { green, cyan } from "chalk";
import { Client } from "discord.js";
import fs from "fs";
import client from "../Neptune";

export = {
  name: "ready",
  once: true,
  execute() {
    const commandFiles = fs
      .readdirSync("./src/commands/")
      .filter((file) => file.endsWith(".ts"));
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      (client as any).commands.set(command.data.name, command);
    }

    console.log(green(`Loaded ${commandFiles.length} commands`));
    console.log(cyan("Ready to use! Issues? Report here!"));
    console.log(cyan("https://github.com/dhairy-online/neptune/issues/new"));
    console.log(`Connected as ${cyan(client.user?.tag)}`);
    
    client.deployCommands()

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
