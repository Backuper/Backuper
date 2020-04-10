module.exports = async (client, backupid, message, args, con) => {
    console.log(1);
    
    con.backups.query(`CREATE TABLE \`backup_` + backupid + `_general\` (
        \`guildname\` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
        \`region\` LONGTEXT,
        \`modlevel\` LONGTEXT
    )`);

    con.backups.query(`CREATE TABLE \`backup_` + backupid + `_roles\` (
        \`name\` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
        \`color\` INT,
        \`hoist\` BOOLEAN,
        \`position\` INT,
        \`mentionable\` BOOLEAN,
        \`permissions\` INT
    )`);

    con.backups.query(`CREATE TABLE \`backup_` + backupid + `_channels\` (
        \`name\` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
        \`type\` LONGTEXT,
        \`description\` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
        \`ratelimit\` INT,
        \`nsfw\` BOOLEAN,
        \`permissions\` LONGTEXT,
        \`position\` INT
    )`)

    con.backups.query(`CREATE TABLE \`backup__users\` (
        \`id\` LONGTEXT,
        \`roles\` LONGTEXT,
        \`nickname\` LONGTEXT
    )`)

    
    con.backuper.query("INSERT INTO `backups` (`userid`, `backupid`, `servername`, `public`) VALUES (?, ?, ?, ?);", [message.author.id, backupid, message.guild.name.toString(), 1])
    con.backups.query("INSERT INTO `backup_" + backupid + "_general`(`guildname`, `region`, `modlevel`) VALUES (?,?,?)", [message.guild.name, message.guild.region, message.guild.verificationLevel])

    message.guild.roles.cache.forEach(role => {
        if(role.name === "@everyone") return
        console.log(role.hoist);
        
        con.backups.query("INSERT INTO `backup_" + backupid + "_roles`(`name`, `color`, `hoist`, `position`, `mentionable`, `permissions`) VALUES (?,?,?,?,?,?)", [role.name.toString(), role.color, role.hoist, role.position, role.mentionable, role.permissions.bitfield])
    });
    message.guild.channels.cache.forEach(channel => {
        console.log(channel.name);
        con.backups.query("INSERT INTO `backup_" + backupid + "_channels`(`name`, `type`, `description`, `ratelimit`, `nsfw`, `permissions`, `position`) VALUES (?,?,?,?,?,?,?)", [channel.name.toString(), channel.type, channel.topic, channel.rateLimitPerUser, channel.nsfw, JSON.stringify(channel.permissionOverwrites.array()), channel.position])
    });
    /*
    message.guild.members.cache.forEach(member => {      
        con.backups.query("INSERT INTO `backup_" + backupid + "_users`(`id`, `roles`, `nickname`) VALUES (?,?,?)", [member.id, JSON.stringify(member.roles.cache.array()), member.nickname || ""]);
    });
    */
}