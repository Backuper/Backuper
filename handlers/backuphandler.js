const con = require("../utils/database")
const { MessageEmbed } = require("discord.js")
const create = require("./backupmethods/create")
const load = require("./backupmethods/load")
const list = require("./backupmethods/list")

module.exports.create = async (client, backupid, message, args) => {
    let embed = new MessageEmbed()
    .setTitle("Backup")
    .setDescription(`Are you sure that you wan to create a Backup from ${message.guild.name}?`)
    
    let reply = await message.channel.send(embed)

    reply.react("✅")
    reply.react("❌")

    let collector = reply.createReactionCollector((reaction, user) => reaction.emoji.name === "✅" && user.id == message.member.id, {time: 20000})
    let colletcor2 = reply.createReactionCollector((reaction, user) => reaction.emoji.name === "❌" && user.id == message.member.id, {time: 20000})

    collector.on("collect", async (r) => {
        reply.delete()
        create(client, backupid, message, args, con);
    })
    
    colletcor2.on("collect", async (r) => {
        reply.delete()
    })
    
}

module.exports.load = async (client, backupid, message, args) => {
    let embed = new MessageEmbed()
    .setTitle("Do you really want to load this Backup?")
    .setDescription("Restoring it will delete all roles and channels.")

    let msg = await message.channel.send(embed);
    await msg.react("✅")
    await msg.react("❌")

    const restorefilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
    const restore = await msg.createReactionCollector(restorefilter, { time: 15000 });
    restore.once('collect', r => {
        console.log("Restoring: " + message.guild.name);
        msg.delete()
        load(client, backupid, message, args, con);
    });

    const cancelfilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
    const cancel = await msg.createReactionCollector(cancelfilter, { time: 15000 });
    cancel.once('collect', r => {
        console.log("Restoring canceled: " + message.guild.name);
        msg.delete()
        load(client, backupid, message, args, con);
    });
    cancel.on('end', collected => msg.delete());

}

module.exports.list = async (client, userid, channel) => {
    list(client, userid, channel, con)
}
