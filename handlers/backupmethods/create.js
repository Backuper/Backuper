module.exports = async (client, backupid, message, args, con) => {
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
        \`position\` INT
    );`)

    con.backups.query(`CREATE TABLE \`backup_` + backupid + `_users\` (
        \`id\` LONGTEXT,
        \`roles\` LONGTEXT,
        \`nickname\` LONGTEXT
    );`)




    message.guild.roles.cache.forEach(role => {
        if(role.name === "@everyone") return
        con.backups.query("INSERT INTO `backup_" + backupid + "_roles`(`name`, `color`, `hoist`, `position`, `mentionable`) VALUES (?,?,?,?,?)", [role.name, role.color, role.hoist, role.position, role.mentionable])
    });

    message.guild.channels.cache.forEach(channel => {
        con.backups.query("INSERT INTO `backup_" + backupid + "_channels`(`name`, `type`, `description`, `ratelimit`, `nsfw`, `permissions`, `position`) VALUES (?,?,?,?,?,?,?)", [channel.name, channel.type, channel.description, channel.rateLimitPerUser, channel.nsfw, JSON.stringify(channel.permissionOverwrites.array()), channel.position])
    });

    message.guild.members.cache.forEach(member => {      
        con.backups.query("INSERT INTO `backup_" + backupid + "_users`(`id`, `roles`, `nickname`) VALUES (?,?,?)", [member.id, JSON.stringify(member.roles.cache.array()), member.nickname || ""]);
    });
}