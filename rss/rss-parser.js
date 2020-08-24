let Parser = require("rss-parser");
let parser = new Parser();

const rss_parser = async () => {
  let feed = await parser.parseURL(
    "https://www.elobservador.com.uy/rss/elobservador.xml"
  );
  console.log(feed.title);

  feed.items.forEach((item) => {
    console.log(item.title + ":" + item.link);
  });
};

module.exports = rss_parser;
