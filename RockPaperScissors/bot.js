require('dotenv').config(); // Pulls in all entries in .env and adds them to process.env
const {discriminator} = require('./config.json'); // Imports our bot settings from the file config.json
const Discord = require('discord.js'); // Imports the Discord.js Libray
const client = new Discord.Client(); // Creates an instance of the library. This represents our bot

client.on('ready', () => {
    // This code gets executed when the bot starts up
    console.log("Bot is online, ready to recieve messages");
})

client.on('message', (message) => {
    console.log("A message was recived");
    // Check to make sure the message was not sent by a bot and that the messages started with the discriminator
    if(message.author.bot && !message.content.startsWith(discriminator)) return; 
    const command = message.content.substr(1); // Removing the ! so we can know what the command is
    console.log(command)
    if(command.toLowerCase().includes("rps")){ // !rps {rock | paper | scissors}
        const args = command.toLowerCase().split(" ");
        console.log("RPS Called", args.length);
        if(!args.length > 1){
            message.reply("I don't see an item");
            return;
        }
        const item = args[1];
        console.log(item);
        let state = rps(item);
        message.reply(state === 1 ? "You Win": state === 2 ? "You Lose" : "Tie");
    }
    
    
})

//This line tells our bot to try and connect to the discord servers
client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error("The token provided seems to be missing or invalid, check your .env file to fix it");
    process.exit();
}); 

function rps(item){
    console.log(item);
    const cpuItem = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
    console.log("Player chose: ", item, "CPU chose: ", cpuItem)
    if(cpuItem === item){
        return 0;
    }else if(cpuItem === "rock" && item === "paper"){
        return 1;
    }else if(cpuItem === "paper" && item === "scissors"){
        return 1;
    }else if(cpuItem === "rock" && item === "scissors"){
        return 2;
    }else if(cpuItem === "paper" && item === "rock"){
        return 2;
    }else{
        return 0;
    }
}