import { Client, Collection, Intents } from "discord.js";
import token from "./token";
import fs from "fs";
import { Routes } from "discord-api-types/v9";
import mainConfig from "./configs/main.config.json";
import { REST } from "@discordjs/rest";
import { SlashCommandBuilder } from "@discordjs/builders";

class CommandBuilder extends SlashCommandBuilder {
  execute: any | Promise<any>
}
class NeptuneClient extends Client {
  public commands: Collection<unknown, CommandBuilder>;
  constructor() {
    super({
      partials: ["CHANNEL"],
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
    });

    this.commands = new Collection();
  }
  init() {
    console.info("Client Initialized");
    this.loadEvents();
    this.loadCommands();
    this.login(token);
  }
  deployCommands() {
    const rest = new REST({ version: "9" }).setToken(token);
    rest
      .put(Routes.applicationCommands(mainConfig.GENERAL.CLIENTID), {
        body: this.loadCommands(),
      })
      .catch(console.error);
  }
  loadCommands(): string[] {
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
  loadEvents(): string[] {
    const events = [];
    const eventFiles = fs
      .readdirSync("./src/events")
      .filter((file) => file.endsWith(".ts"));

    for (const file of eventFiles) {
      const event = require(`./events/${file}`);
      if (event.once) {
        this.once(event.name, (...args) => event.execute(...args));
      } else {
        this.on(event.name, (...args) => event.execute(...args));
      }
      events.push(event);
    }
    return events;
  }
}

const client = new NeptuneClient();
export default client;
client.init();
