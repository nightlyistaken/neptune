import { GuildManager, GuildMember, Interaction } from "discord.js";
import fs from "fs";
import { Client, Collection, Intents } from "discord.js";
import botToken from "./configs/token.json";
import { red, white, greenBright } from "chalk";

const client: any = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

client.commands = new Collection();

// Command handler
const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".ts"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args: any) => event.execute(...args));
  } else {
    client.on(event.name, (...args: any) => event.execute(...args));
  }
  console.info(greenBright(`Loaded ${event.name} event.`));
}
client.on("guildMemberAdd" , async (member : any) => {
  console.log("Someone joined");
});

// Load slash commands
client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command: any = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
    console.log(
      white(
        `/${interaction.commandName} was executed by ${interaction.user.tag} on ${interaction.guild?.name}`
      )
    );
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
  .on("reconnecting", () => console.info("Reconnecting..."));

client.login(botToken.token);
