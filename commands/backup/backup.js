var randomstring = require("randomstring");
const { MessageEmbed } = require("discord.js")
let con = require("../../utils/database")
//let backup = require("../../handlers/backup")
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
            let embed = new MessageEmbed()
            .setTitle("Backup")
            .setDescription(`Are you sure that you wan to create a Backup from ${message.guild.name}?`)
            let reply = await message.channel.send(embed)
            reply.react("✅")
            reply.react("❌")
            let collector = reply.createReactionCollector((reaction, user) => reaction.emoji.name === "✅" && user.id == message.member.id, {time: 20000})
            collector.on("collect", async (r) => {
                reply.delete()
                // Function hier
            })
            let colletcor2 = reply.createReactionCollector((reaction, user) => reaction.emoji.name === "❌" && user.id == message.member.id, {time: 20000})
            colletcor2.on("collect", async (r) => {
                reply.delete()
            })
        }
    }
}