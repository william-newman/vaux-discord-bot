import Discord from "discord.js";
import { vauxToken } from "./vaux-token.js";
import fs from "fs";
import Spotify from "node-spotify-api";

const spotifyAPI = new Spotify({
  id: "<your spotify client id>",
  secret: "<your spotify client secret>"
});
const client = new Discord.Client();
const channels = client.channels;

const cataVauxChannel = channels.cache.get("755615150299676752");
const cataBillyChannel = channels.cache.get("688146153786966019");

client.on("ready", () => {
  let time = new Date();
  fs.appendFile(
    "./vaux-logs.txt",
    client.user.tag + " has connected at " + time + "\n",
    function (err) {
      if (err) throw err;
    }
  );

  // spotify.search(
  //   { type: "track", query: "dancing in the moonlight" },
  //   function (err, data) {
  //     if (err) {
  //       console.log("Error occurred: " + err);
  //       return;
  //     }

  //     console.log(data);
  //     // Do something with 'data'
  //   }
  // );

  // let rawVauxData = fs.readFileSync("./vaux-command-data.json");
  // let vauxData = JSON.parse(rawVauxData);

  time = time.toLocaleTimeString();
  if (time.startsWith("4")) {
    client.user.setActivity("Sad Hour 💀");
  } else {
    // client.user.setActivity("directive 6 protocol", { type: "LISTENING" });
    client.user.setActivity("sad stuff", { type: "LISTENING" });
    // client.user.setActivity("Follow The Leader");
  }

  // const serverList = client.guilds.cache;

  // serverList.forEach((guild) => {
  //   console.log(guild.name);

  //   guild.channels.cache.forEach((channel) => {
  //     logChannelAndEmojiIDs(
  //       `${channel.type} -  ${channel.name} ${channel.id}\n`
  //     );
  //   });
  // });

  console.log("Running ...");
});

client.on("presenceUpdate", (presence) => {
  if (presence) {
    if (presence.guild.id.match("278406764846907392")) {
      if (presence.activities[0]) {
        client.user.setActivity(presence.activities[0].name, {
          type: "PLAYING",
        });
      }
    }
  }
});

client.on("message", (receivedMessage) => {
  const incomingM = receivedMessage.content.toLowerCase();
  const bellaEmote = receivedMessage.guild.emojis.cache.get(
    "692452430306082918"
  );
  const chaseBabyEmote = receivedMessage.guild.emojis.cache.get(
    "677646228716257280"
  );
  const daddyEmote = receivedMessage.guild.emojis.cache.get(
    "684533234184486913"
  );

  if (receivedMessage.author.username.match("ChaseDunton")) {
    const chaseReactProbability = Math.floor(Math.random() * 10);
    if (chaseReactProbability <= 2) {
      receivedMessage.react(chaseBabyEmote);
    }
  }

  if (receivedMessage.author == client.user) {
    return;
  } else if (receivedMessage.channel.id !== "755615150299676752") {
    return;
  }

  if (receivedMessage.author.username.match("LN")) {
    const tadaReactProbability = Math.floor(Math.random() * 10);
    if (tadaReactProbability === 0) {
      receivedMessage.react("🎉");
    }
  }

  if (
    receivedMessage.author.username.match("ChaseDunton") &&
    incomingM.startsWith("make ")
  ) {
    receivedMessage.channel.send("Make it yourself.");
  }

  if (
    incomingM.startsWith("vaux what are you doing") ||
    incomingM.startsWith("vaux wyd")
  ) {
    const activities = client.user.presence.activities;
    let botActivities = [];
    activities.forEach((activity) => {
      botActivities.push(
        activity.type.toLocaleLowerCase() + " " + activity.name
      );
    });
    receivedMessage.channel.send(botActivities.toLocaleString());
  }

  // receivedMessage.guild.emojis.cache.forEach((customEmoji) => {
  //   logChannelAndEmojiIDs(`${customEmoji.name} ${customEmoji.id}\n`);
  // });

  if (incomingM.includes("bella")) {
    receivedMessage.react(bellaEmote);
  }

  if (incomingM.includes("daddy")) {
    receivedMessage.react(daddyEmote);
  }

  if (incomingM.startsWith("vaux say hi")) {
    receivedMessage.channel.send(
      "Yo yo what up " + receivedMessage.author.toString() + "!",
      { tts: true }
    );
    localCommandCountDataWriteService("sayHi");
  }

  if (incomingM.startsWith("vaux truth")) {
    receivedMessage.channel.send("Half Life 3 will never be made.");
    localCommandCountDataWriteService("truth");
  }

  if (incomingM.startsWith("vaux what's good")) {
    receivedMessage.channel.send(
      "https://www.youtube.com/watch?v=0tdyU_gW6WE&ab_channel=NeilCicierega"
    );
    localCommandCountDataWriteService("whatsGood");
  }

  if (incomingM.startsWith("vaux fortnite")) {
    const fnGifArr = [
      "https://media.giphy.com/media/jO2NwLwjQ3zfntm5Qm/giphy.gif",
      "https://media.giphy.com/media/kEWaRPxjebqskhawMt/giphy.gif",
      "https://media.giphy.com/media/TDKxZPossicXJEm455/giphy.gif",
      "https://media.giphy.com/media/iMBEVqJRJkEQC5EGa2/giphy.gif",
      "https://media.giphy.com/media/fefVaYmApHUdOjj1o6/giphy.gif",
      "https://media.giphy.com/media/878n18Z0gJNAUXpubj/giphy.gif",
      "https://media.giphy.com/media/1APhATvqD65r966yCP/giphy.gif",
      "https://media.giphy.com/media/W5lF9jj0dkU56bQTHF/giphy.gif",
    ];
    const randomGifIndex = Math.floor(Math.random() * fnGifArr.length);
    receivedMessage.channel.send(fnGifArr[randomGifIndex]);
    if (incomingM.includes("count")) {
      receivedMessage.channel.send(fnGifArr.length);
    }
    localCommandCountDataWriteService("fortnite");
  }

  if (
    incomingM.startsWith("vaux command hit execution count") ||
    incomingM.match("^vaux chec$")
  ) {
    const commandCountObj = localCommandCountDataReadService();
    let commandCountMessage =
      "Thanks: " +
      commandCountObj.commandCount.thanks +
      "\nTruth: " +
      commandCountObj.commandCount.truth +
      "\nSay Hi: " +
      commandCountObj.commandCount.sayHi +
      "\nHelp: " +
      commandCountObj.commandCount.help +
      "\nFortnite: " +
      commandCountObj.commandCount.fortnite +
      "\n✅CHEC: " +
      commandCountObj.commandCount.chec +
      "\nWhat's Good: " +
      commandCountObj.commandCount.whatsGood;
    receivedMessage.channel.send(commandCountMessage);
    localCommandCountDataWriteService("chec");
  }

  if (
    incomingM.includes("thanks") ||
    (incomingM.includes("thank you") && incomingM.includes("vaux"))
  ) {
    receivedMessage.react("👍");
    localCommandCountDataWriteService("thanks");
  }

  if (incomingM.startsWith("vaux help")) {
    receivedMessage.channel.send(
      "Command prefix: Vaux\n" +
        "Current commands:\n" +
        "[Help] - displays this text\n" +
        "[Fortnite] - displays the folly of humanity\n" +
        "[Truth] - displays today's truth\n" +
        "[What's Good] - Bustin\n" +
        "[Say Hi] - Vaux says hello\n \n" +
        "All commands are currently WIP and restricted to Vaux's channel."
    );
    localCommandCountDataWriteService("help");
  }
});

function localCommandCountDataWriteService(command) {
  let rawVauxData = fs.readFileSync("./vaux-command-data.json");
  let vauxData = JSON.parse(rawVauxData);
  vauxData.commandCount[command]++;
  const stringVauxData = JSON.stringify(vauxData, null, 2);
  fs.writeFileSync("./vaux-command-data.json", stringVauxData);
}

function localCommandCountDataReadService() {
  let rawVauxData = fs.readFileSync("./vaux-command-data.json");
  let vauxData = JSON.parse(rawVauxData);
  return vauxData;
}

function logChannelAndEmojiIDs(identificationData) {
  console.log(identificationData);
  fs.appendFileSync("./vaux-ids.txt", identificationData);
}

client.on("disconnect", () => {
  fs.appendFileSync("./vaux-logs.txt", "Vaux has disconnected.");
});

client.login(vauxToken);
