import { Interaction } from "discord.js";

import fs from "fs";
import { Client, Collection, Intents } from "discord.js";
const client: any = new Client({ intents: [Intents.FLAGS.GUILDS] });
import mainConfig from "./configs/main.config.json";
import { green , cyan, red} from "chalk";

client.commands = new Collection();

// Command handler used for listening to commands
/** Contains command files */
const commandFiles = fs
  .readdirSync("./src/commands/")
  .filter((file: string) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  let reStats = true;
  console.log(cyan("Ready to use! Issues? Report here!"));
  console.log(cyan("https://github.com/dhairy-online/nevagon/issues/new"));
  setInterval(() => {
    if (reStats) {
      client.user?.setActivity(`slash commands | Online`, {
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
  }, 10000)
  console.log(green('Loaded %s commands'), commandFiles.length)
})

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command: any = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.log(red("Interaction Failed"));
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client
  .on("disconnect", () => console.warn("Disconnecting..."))
  .on("reconnecting", () => console.log("Reconnecting..."));

client.login(mainConfig.SECRETS.TOKEN);
