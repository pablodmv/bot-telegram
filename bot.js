const Telegraf = require("telegraf");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
  ctx.reply("Usa whatsap, Viejo");
});

bot.on("text", (ctx) => {
  ctx.reply("Usa whatsapp!!");
});

bot.launch();
