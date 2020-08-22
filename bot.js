const Telegraf = require("telegraf");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const messageDB = require("./db/message");

//Base de datos
connectDB();

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
  ctx.reply("Usa whatsap, Viejo");
});

bot.on("text", async (ctx) => {
  ctx.reply("Usa whatsapp!!");

  await messageDB.postMessage(
    ctx.from.id,
    ctx.chat.first_name,
    ctx.message.text
  );
  console.log(ctx.from.id);
  console.log(ctx.chat.first_name);
  console.log(ctx.message.text);
});

bot.launch();
