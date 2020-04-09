var randomstring = require("randomstring");
const { MessageEmbed } = require("discord.js")
let con = require("../../utils/database")
//let backup = require("../../handlers/backup")
module.exports.run = async (client, message, args) => {

    let backupid = randomstring.generate(10);
    console.log(backupid);
    
    con.backups.query(`CREATE TABLE \`backup_` + backupid + `_general\` (
        \`guildname\` LONGTEXT,
        \`region\` LONGTEXT,
        \`modlevel\` LONGTEXT
    );`);

    con.backups.query(`CREATE TABLE \`backup_` + backupid + `_roles\` (
        \`name\` LONGTEXT,
        \`color\` INT,
        \`hoist\` BOOLEAN,
        \`position\` INT,
        \`mentionable\` BOOLEAN
    );`);

    con.backups.query(`CREATE TABLE \`backup_` + backupid + `_channels\` (
        \`name\` LONGTEXT,
        \`type\` LONGTEXT,
        \`description\` LONGTEXT,
        \`ratelimit\` INT,
        \`nsfw\` BOOLEAN,
        \`permissions\` LONGTEXT,
        \`position\` LONGTEXT
    );`)


    message.guild.roles.cache.forEach(role => {
        if(role.name === "@everyone") return
        con.backups.query("INSERT INTO `backup_" + backupid + "_roles`(`name`, `color`, `hoist`, `position`, `mentionable`) VALUES (?,?,?,?,?)", [role.name, role.color, role.hoist, role.position, role.mentionable])
    });

    message.guild.channels.cache.forEach(channel => {
        con.backups.query("INSERT INTO `backup_" + backupid + "_channels`(`name`, `type`, `description`, `ratelimit`, `nsfw`, `permissions`, `position`) VALUES (?,?,?,?,?,?,?)", [channel.name, channel.type, channel.description, channel.rateLimitPerUser, channel.nsfw, channel.permissionOverwrites, channel.position])
    });


    /*message.guild.channels.cache.forEach(channel => {
        console.log(channel.permissionOverwrites)
        
    });*/

    message.channel.send("Done!")
}