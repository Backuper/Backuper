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

    const restorefilter = (reaction, user) => { return reaction.emoji.name === '👌' && user.id === message.author.id;  };
    const restore = message.createReactionCollector(filter, { time: 20000 });

    restore.on('collect', (reaction, reactionCollector) => {
        load(client, backupid, message, args, con);
    });
    
    restore.on('end', collected => {
        msg.reactions.removeAll();
    });

    const cancelfilter = (reaction, user) => { return reaction.emoji.name === '👌' && user.id === message.author.id;  };
    const cancel = message.createReactionCollector(filter, { time: 20000 });

    cancel.on('collect', (reaction, reactionCollector) => {
        load(client, backupid, message, args, con);
    });
    
    cancel.on('end', collected => {
        msg.reactions.removeAll();
    });


    load(client, backupid, message, args, con);
}

module.exports.list = async (client, userid, channel) => {
    list(client, userid, channel, con)
}
