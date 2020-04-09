const con = require("../utils/database")
const { MessageEmbed } = require("discord.js")
const create = require("./backupmethods/create")
const load = require("./backupmethods/load")
const list = require("./backupmethods/list")

module.exports.create = async (client, backupid, message, args) => {
    create(client, backupid, message, args, con);
}

module.exports.load = async (client, backupid, message, args) => {
    let embed = new MessageEmbed()
    .setTitle("Do you really want to load this Backup?")
    .setDescription("Restoring it will delete all roles and channels.")

    let msg = await message.channel.send(embed);
    await msg.react("✅")
    await msg.react("❌")

    const restorefilter = (reaction, user) => reaction.emoji.name === '✅';
    const collector = await message.createReactionCollector(restorefilter, { time: 15000 });
    await collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
    collector.on('end', collected => msg.delete());
    

}

module.exports.list = async (client, userid, channel) => {
    list(client, userid, channel, con)
}
