import Discord from "discord.js";
import { vauxToken } from "./vaux-secret.js"
const client = new Discord.Client();

const channels = client.channels;

const cataVauxChannel = channels.cache.get("755615150299676752");
const cataBillyChannel = channels.cache.get("688146153786966019");

client.on("ready", () => {
  console.log("Connected as " + client.user.tag);

  client.user.setActivity("Hide the Pickle 😁");

  const serverList = client.guilds.cache;

  //   serverList.forEach((guild) => {
  //     console.log(guild.name);

  //     guild.channels.cache.forEach((channel) => {
  //       console.log(` -  ${channel.name} ${channel.type} ${channel.id}`);
  //     });
  //   });

  // cataBillyChannel.send("discord.run(invasion.exe)");
});

client.on("message", (receivedMessage) => {
  // console.log(receivedMessage);
  const bellaEmote = receivedMessage.guild.emojis.cache.get(
    "692452430306082918"
  );
  const chaseBabyEmote = receivedMessage.guild.emojis.cache.get(
    "677646228716257280"
  );

  if (receivedMessage.author == client.user) {
    return;
  } else if (receivedMessage.channel.id !== "755615150299676752") {
    return;
  }

  if (receivedMessage.author.username.match("kairopterror")) {
    receivedMessage.react("🎉");
  }

  if (receivedMessage.author.username.match("ChaseDunton")) {
    receivedMessage.react(chaseBabyEmote);
  }

  // receivedMessage.guild.emojis.cache.forEach((customEmoji) => {
  //   console.log(`${customEmoji.name} ${customEmoji.id}`);
  // });

  if (receivedMessage.content.toLowerCase().includes("bella")) {
    receivedMessage.react(bellaEmote);
  }

  if (receivedMessage.content.toLowerCase().startsWith("vaux say hi")) {
    //   processCommand(receivedMessage);
    receivedMessage.channel.send(
        "Yo yo what up " +
          receivedMessage.author.toString() +
          "!"
      );
  }
});

// function processCommand(receivedMessage) {
//     receivedMessage.content.toLowerCase().
// }

client.login(vauxToken);
