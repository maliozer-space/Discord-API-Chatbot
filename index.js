// NPM MODULES
const commando = require("discord.js-commando");

const { config } = require("dotenv");
const path = require("path");
const oneLine = require("common-tags").oneLine;
const sqlite = require("sqlite");
sqlite.open("./database.sqlite3");



config({
    path: __dirname + "/.env"
});

var owner_discord_id = process.env.OWNER_DC_ID; //maliozer
var report_channel_id = process.env.REPORT_CHANNEL_ID; //bot-test

const client = new commando.Client({
  owner: owner_discord_id,
  commandPrefix: "!",
  disableEveryone: true,
  unknownCommandResponse: false
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var bot_prefix = "!";

//on ready
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity(
    `${bot_prefix}help | Running on ${client.guilds.size} servers`
  );
});

// Error handling
client
  .on("error", console.error)
  .on("warn", console.warn)
  .on("debug", console.log);


// Bot status
client
  .on("reconnecting", () => {
    console.warn("Rio is reconnecting...");
  })
  .on("disconnect", () => {
    console.warn("Warning! Rio has disconnected!");
  });
  
  
  var colour_array = [
    "1211996",
    "3447003",
    "13089792",
    "16711858",
    "1088163",
    "16098851",
    "6150962"
  ];
  var randomNumber = getRandomNumber(0, colour_array.length - 1);
  var randomColour = colour_array[randomNumber];


client.on("guildMemberAdd", member => {
  // image welcoming coming soon
});

client
  .setProvider(
    sqlite
      .open(path.join(__dirname, "database.sqlite3"))
      .then(db => new commando.SQLiteProvider(db))
  )
  .catch(console.error);

client.registry
  .registerDefaultTypes()

  .registerGroups([
    ["util", "Util"],
    [
      "media",
      "Media commands: Search for stickers & GIFs, make memes, make qr codes/captchas, etc.,"
    ],
    [
      "fun",
      "Fun commands: All sorts of entertaining commands can be found here. "
    ],
    [
      "search",
      "Search commands: Search YouTube, ask Onyx questions, get answers to anything, get data, definitions, etc.,"
    ],
    [
      "message_formatting",
      "Format your messages, translate them to 1337, binary, emojipastas, and more."
    ],
    [
      "social",
      "Social commands: Get avatars, wave and poke people. More on the way."
    ],
    [
      "space",
      "Space commands: Get live NASA footage, ISS coordinates, and space imagery."
    ],
    [
      "meta",
      "Meta commands: Get info about your server, about Onyx, who coded her, etc.,"
    ]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({ help: false })
  .registerCommandsIn(path.join(__dirname, "commands"));


client.login(process.env.TOKEN);