import { Client, Collection, Intents } from "discord.js";
import token from "./token";
import fs from "fs";
import { Routes } from "discord-api-types/v9";
import mainConfig from "./configs/main.config.json";
import { REST } from "@discordjs/rest";

class Neptune extends Client {
  commands: any;
  constructor() {
    super({
      partials: ["CHANNEL"],
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
    });

    this.commands = new Collection();
  }
  init() {
    this.loadEvents();
    this.someEvents();
    this.login(token);
  }
  deployCommands() {
    const rest = new REST({ version: "9" }).setToken(token);
    rest
      .put(Routes.applicationCommands(mainConfig.GENERAL.CLIENTID), {
        body: client.loadDeployCommands(),
      })
      .catch(console.error);
  }
  private loadDeployCommands() {
    const commands = [];
    const commandFiles = fs
      .readdirSync("./src/commands")
      .filter((file: string) => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      commands.push(command.data.toJSON());
    }
    return commands;
  }
  someEvents() {
    this.on("disconnect", () => console.warn("Disconnecting...")).on(
      "reconnecting",
      () => console.info("Reconnecting...")
    );
  }
  loadEvents() {
    const eventFiles = fs
      .readdirSync("./src/events")
      .filter((file) => file.endsWith(".ts"));

    for (const file of eventFiles) {
      const event = require(`./events/${file}`);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
  }
}

const client = new Neptune();
export default client;
