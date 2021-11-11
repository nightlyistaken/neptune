import { green, cyan } from "chalk";
import client from "../base/NeptuneClient";

export = {
  name: "ready",
  once: true,
  execute() {
    const commands = client.loadCommands();
    console.log(green(`Loaded ${commands.length} commands`));
    console.log(cyan("Ready to use! Issues? Report here!"));
    console.log(cyan("https://github.com/dhairy-online/neptune/issues/new"));
    console.log(`Connected as ${cyan(client.user?.tag)}`);

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
