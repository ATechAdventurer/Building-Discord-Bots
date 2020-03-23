require('dotenv').config(); // Pulls in all entries in .env and adds them to process.env
const {discriminator} = require('./config.json'); // Imports our bot settings from the file config.json
const Discord = require('discord.js'); // Imports the Discord.js Libray
const client = new Discord.Client(); // Creates an instance of the library. This represents our bot

client.on('ready', () => {
    // This code gets executed when the bot starts up
    console.log("Bot is online, ready to recieve messages");
})

client.on('message', (message) => {
    // Check to make sure the message was not sent by a bot and that the messages started with the discriminator
    if(message.author.bot && !message.content.startsWith(discriminator)) return; 
    //Put your bot code here
})

//This line tells our bot to try and connect to the discord servers
client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error("The token provided seems to be missing or invalid, check your .env file to fix it");
    process.exit();
}); 