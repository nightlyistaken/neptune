const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const botToken = require("./configs/token.json")
const red = require("chalk");
const wait = require("util").promisify(setTimeout);
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
});

client.commands = new Collection();

// Command handler
const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Load slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const commands = client.commands
  const command = commands.get(interaction.commandName);

  if (!command) return;

  try {
    // Try to show "Sending command.." 
    await wait(500);
    await command.execute(interaction);
  } catch (err) {
    console.log(red("Interaction Failed"));
    console.error(err);
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
