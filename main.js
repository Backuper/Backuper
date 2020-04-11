'use strict';

/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'ping') {
      message.reply("lol")
        message.guild.roles.create({
            data: {
            name: 'Super Cool People',
            color: 'BLUE',
            },
            reason: 'we needed a role for Super Cool People',
        })
            .then(console.log)
            .catch(console.error);
      
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('Njk3Mzc0MTQ4MjU0NjI5OTU5.Xo2c4Q.4FqDUcoCUa9EPZ5hXwAEaWrkvQg');