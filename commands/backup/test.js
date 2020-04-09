var randomstring = require("randomstring");
const { MessageEmbed } = require("discord.js")
let con = require("../../utils/database")
let backup = require("../../handlers/backuphandler")
module.exports.run = async (client, message, args) => {
    
    let backupid = randomstring.generate(10);
    console.log(backupid);
    //await backup.create(client, backupid, message, args) 
    await backup.load(client, backupid, message, args);

    let embed = new MessageEmbed()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTitle("Backup created Succsesfully.")
    .setDescription("Backup ID: " + backupid + "\n\nUse bc+backup load " + backupid + " to Put your server back to this state.")

    message.channel.send(embed)
}