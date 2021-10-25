const { green, cyan } = require("chalk");
const fs = require("fs");
const deploy = require("../deploy");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    const commandFiles = fs
      .readdirSync("./src/commands/")
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      client.commands.set(command.data.name, command);
    }

    console.info(green(`Loaded ${commandFiles.length} commands`));
    console.log(cyan("Ready to use! Issues? Report here!"));
    console.log(cyan("https://github.com/dhairy-online/neptune/issues/new"));
    console.info(`Connected as ${cyan(client.user.tag)}`);
    
    deploy();

    let reStats = true;
    setInterval(() => {
      if (reStats) {
        // I cant figure out whaat to do XD
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
