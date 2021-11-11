## Simple Command Handler
```js
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));
let command = commandFiles
  .map((file) => require(`../commands/${file}`))
  .find((c) => c.data.name == input);

const commandNames = [];
const embed = new MessageEmbed();
embed.setTitle("Help").setDescription("Helper is here");
for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commandNames.push(command.data.name);
  embed.setFields({ name: `Misc`, value: `${commandNames}` });
}
```
