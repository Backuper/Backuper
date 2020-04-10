var randomstring = require("randomstring");
const { MessageEmbed } = require("discord.js")
let con = require("../../utils/database")
let backup = require("../../handlers/backuphandler")
module.exports.run = async (client, message, args) => {
    let values = ["create", "load", "list"]
    let value = args[0]
    if(!values.includes(value)) {
        let embed = new MessageEmbed()
        .setTitle("Backups")
        .setDescription("Create Backups and load them!")
        .addField("bc+backup create", "Create a Backup")
        .addField("bc+backup load", "Load a backup")
        .addField("bc+backup info", "Get infos about a Backup!")
        .addField("bc+backup delete", "Delete a Backup!")
        return message.channel.send(embed)
    } else {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            let embed = new MessageEmbed()
            .setTitle("Backup")
            .setDescription("Sorry but you need the permission `ADMINISTRATOR`")
            let send = await message.channel.send(embed)
            setTimeout(() => {
                send.delete()
            }, 12000);
            return
        }

        if(value.includes("create")) {
            let backupid = randomstring.generate(10);
            await backup.create(client, backupid, message, args);

            let embed = new MessageEmbed()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTitle("Backup created Succsesfully.")
            .setDescription("Backup ID: " + backupid + "\n\nUse bc+backup load " + backupid + " to Put your server back to this state.")

            message.channel.send(embed)
        }
        if(value.includes("load")){
            backup.load(client, args[BACKUPIDARGHIER], message, args)
        }
        if(values.includes("list")) {
            backup.list(client, message.member.id, message.channel)
        }
        
    }
}