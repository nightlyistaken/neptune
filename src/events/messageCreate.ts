import client from "../base/NeptuneClient";

xport = {
  name: "ready",
  once: true,
  execute() {
    const commands = client.loadCommands();
    const { content } = message;

    aliases.forEach((alias) => {
      const command = `${prefix}${alias}`;

      if (content.startsWith(`${command} `) || content === command) {
        console.log(`Running the command ${command}`);
        callback(message);
      }
    });
  },
};
