const Telegraf = require("telegraf");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const messageDB = require("./db/message");
//const rss_parser = require("./rss/rss-parser");
const async = require("async");
let Parser = require("rss-parser");
let parser = new Parser();

var _globalLastCommand = "";

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

bot.command("/buscar_diaria", (ctx) => {
  _globalLastCommand = "/buscar_diaria";
  ctx.reply("Ingrese el texto a buscar");
});

bot.command("/buscar_observa", (ctx) => {
  _globalLastCommand = "/buscar_observa";
  ctx.reply("Ingrese el texto a buscar");
});

bot.on("text", async (ctx) => {
  if (
    _globalLastCommand === "/buscar_diaria" ||
    _globalLastCommand === "/buscar_observa"
  ) {
    let url = "";
    if (_globalLastCommand === "/buscar_diaria") {
      url = "https://ladiaria.com.uy/feeds/articulos/";
    }
    if (_globalLastCommand === "/buscar_observa") {
      url = "https://www.elobservador.com.uy/rss/elobservador.xml";
    }
    try {
      let search = ctx.message.text;
      ctx.reply(`Buscando ${search}`);
      (async () => {
        let feed = await parser.parseURL(url);
        var flag_no_encontro = 0;
        feed.items.forEach((item) => {
          if (item.title.search(new RegExp(search, "i")) > 0) {
            ctx.reply(item.link);
            flag_no_encontro = 1;
          }
        });
        if (flag_no_encontro === 0) {
          ctx.reply(`No encontró resultados con ${search}`);
        }
      })();
      _globalLastCommand = "";
    } catch (error) {
      ctx.reply(error);
    }
  } else {
    ctx.reply(`Hola ${ctx.chat.first_name}. Para usar el bot ejecuta los siguientes comandos
  /diaria
  /observa`);
    ctx.reply(`También puedes buscar un texto en las noticias. Para buscar ejecuta los siguientes comandos
  /buscar_diaria  
  /buscar_observa`);
  }
  messageDB.postMessage(ctx.from.id, ctx.chat.first_name, ctx.message.text);
});

//rss_parser();

bot.launch();
