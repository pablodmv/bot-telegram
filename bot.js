const Telegraf = require("telegraf");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const messageDB = require("./db/message");
//const rss_parser = require("./rss/rss-parser");
const async = require("async");
let Parser = require("rss-parser");
let parser = new Parser();

//Base de datos
connectDB();

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => {
  ctx.reply("Usa whatsap, Viejo");
});

bot.command("/observa", (ctx) => {
  try {
    (async () => {
      let feed = await parser.parseURL(
        "https://www.elobservador.com.uy/rss/elobservador.xml"
      );
      ctx.reply(feed.title);

      feed.items.forEach((item) => {
        ctx.reply(item.link);
      });
    })();
  } catch (error) {
    ctx.reply(error);
  }
});

bot.command("/diaria", (ctx) => {
  try {
    (async () => {
      let feed = await parser.parseURL(
        "https://ladiaria.com.uy/feeds/articulos/"
      );
      ctx.reply(feed.title);

      feed.items.forEach((item) => {
        ctx.reply(item.link);
      });
    })();
  } catch (error) {
    ctx.reply(error);
  }
});

bot.on("text", async (ctx) => {
  ctx.reply(`Hola ${ctx.chat.first_name}. Para usar el bot ejecuta los siguientes comandos
  /diaria
  /observa`);

  messageDB.postMessage(ctx.from.id, ctx.chat.first_name, ctx.message.text);
  console.log(ctx.from.id);
  console.log(ctx.chat.first_name);
  console.log(ctx.message.text);
});

//rss_parser();

bot.launch();
