import { SlashCommandBuilder } from "@discordjs/builders";

export type CategoryOptions =
  | "Administration"
  | "Fun"
  | "General"
  | "Images"
  | "Moderation"
  | "Music"
  | "Owner";

export default class TritonCommander extends SlashCommandBuilder {
    /**
     * What should happen when the user interacts with the command
     * @returns void
     * @property execute()
     */
  execute!: void | Promise<void>;
  /**
   * The command's category
   * passing nothing will make the category Other
   * 
   * @type CategoryOptions
   * @property category
   */
  category?: CategoryOptions | "Other";
}
