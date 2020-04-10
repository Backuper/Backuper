module.exports = async (client, backupid, message, args, con) => {
    con.query("SELECT * FROM `backups` WHERE backupid = ? ", [backupid], async (error, result) => {
        console.log(result);
        if(result[0]){
            //DELETING SERVER
            await message.guild.roles.cache.forEach(role =>{
                if(role.name === "@everyone" || role.managed) return;
                console.log("Deleting Role: " + role.name);
                role.delete();
            })
            
        
            await message.guild.channels.cache.forEach(channel =>{
                console.log("Deleting Channel: " + channel.name);
                channel.delete();
            })

            //RESTORING SERVER
            await con.backups.query("SELECT * FROM `backup_" + backupid + "_general`", [], async (error, information) => {
                message.guild.setName(information[0].guildname);
                message.guild.setRegion(information[0].region);
                message.guild.setVerificationLevel(information[0].modlevel);
            });

            await con.backups.query("SELECT * FROM `backup_" + backupid + "_roles`", [], async (error, roles) => {
                roles.forEach(role => {
                    message.guild.roles.create({
                        data: {
                          name: role.name,
                          color: role.color,
                          hoist: role.hoist,
                          permissions: role.permissions,
                          mentionable: role.mentionable
                        },
                        reason: 'we needed a role for Super Cool People',
                      })
                       
                })                 
            });

            await con.backups.query("SELECT * FROM `backup_" + backupid + "_channels`", [], async (error, channels) => {
                channels.forEach(channel => {
                    message.guild.channels.create(channel.name, {
                            type: channel.type,
                            topic: channel.topic,
                            nsfw: channel.nsfw,
                            rateLimitPerUser: channel.ratelimit,
                            permissionOverwrites: JSON.parse(channel.permissions),
                            position: channel.position,
                            reason: 'Needed a cool new channel' 
                        })
                       
                })                 
            });

            

        }
    });
}