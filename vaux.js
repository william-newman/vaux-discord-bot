import Discord from "discord.js";
import { vauxToken } from "./vaux-token.js"
const client = new Discord.Client();

const channels = client.channels;

const cataVauxChannel = channels.cache.get("755615150299676752");
const cataBillyChannel = channels.cache.get("688146153786966019");

client.on("ready", () => {
  console.log("Connected as " + client.user.tag);

  client.user.setActivity("u tub");

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
  const daddyEmote = receivedMessage.guild.emojis.cache.get(
    "684533234184486913"
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

  if (receivedMessage.content.toLowerCase().includes("daddy")) {
    receivedMessage.react(daddyEmote);
  }

  if (receivedMessage.content.toLowerCase().startsWith("vaux say hi")) {
    //   processCommand(receivedMessage);
    receivedMessage.channel.send(
        "Yo yo what up " +
          receivedMessage.author.toString() +
          "!"
      );
  }

  if (receivedMessage.content.toLowerCase().startsWith("vaux truth")) {
    //   processCommand(receivedMessage);
    receivedMessage.channel.send(
        "Bush did 9/11"
      );
  }

  if (receivedMessage.content.toLowerCase().startsWith("vaux what's good")) {
    //   processCommand(receivedMessage);
    receivedMessage.channel.send(
        "https://www.youtube.com/watch?v=0tdyU_gW6WE&ab_channel=NeilCicierega"
      );
  }

  if (receivedMessage.content.toLowerCase().startsWith("vaux help")) {
    //   processCommand(receivedMessage);
    receivedMessage.channel.send(
        "Command prefix: Vaux\n" +
        "Current commands:\n" +
        "[Help] - displays this text\n" +
        "[Truth] - displays today's truth\n" +
        "[What's Good] - Bustin\n" +
        "[Say Hi] - Vaux says hello\n \n" +
        "All commands are currently WIP and restricted to Vaux's channel."
      );
  }
  
});

// function processCommand(receivedMessage) {
//     receivedMessage.content.toLowerCase().
// }

client.login(vauxToken);
