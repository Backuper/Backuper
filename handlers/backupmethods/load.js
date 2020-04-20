module.exports = async (client, backupid, message, args, con) => {
    con.query("SELECT * FROM `backups` WHERE backupid = ? ", [backupid], async (error, result) => {
        //console.log(result);
        if(result[0]){
            //DELETING SERVER
            console.log(1);
            for (let index = 0; index < message.guild.roles.cache.array().length; index++) {
                console.log(2);
                
                let role = message.guild.roles.cache.array()[index];
                console.log(2.1);
                if(role.name != "@everyone" && !role.managed){
                    console.log(2.2);
                    console.log("Deleting Role: " + role.name);
                    
                    role.delete();
                    await client.timeout(1000);
                }
                
            }
            console.log(3);
            console.log(message.guild.roles.cache.array().length);          
            console.log(4);
           
            for (let index = 0; index < message.guild.channels.cache.array().length; index++) {
                console.log(5);
                let channel = message.guild.channels.cache.array()[index];
                console.log("Deleting Channel: " + channel.name);
                channel.delete();
                await client.timeout(1000);
                console.log(6);
            }
            console.log(7);

            await client.timeout(2000);

            //RESTORING SERVER
            con.backups.query("SELECT * FROM `backup_" + backupid + "_general`", [], async (error, information) => {
                message.guild.setName(information[0].guildname);
                message.guild.setRegion(information[0].region);
                message.guild.setVerificationLevel(information[0].modlevel);
            });

            con.backups.query("SELECT * FROM `backup_" + backupid + "_roles`", [], async (error, roles) => {
                if(error) throw error;
                for (let index = 0; index < roles.length; index++) {
                    let role = roles[index];
                    await client.timeout(1000);
                    console.log("Creating role: " + role.name);
                    message.guild.roles.create({
                        data: {
                          name: role.name.toString(),
                          color: role.color,
                          hoist: role.hoist,
                          position: role.position,
                          permissions: role.permissions,
                          mentionable: role.mentionable
                        },
                        reason: "Backup Loaded by: " + message.author.username
                    })
                }

            });
            
            con.backups.query("SELECT * FROM `backup_" + backupid + "_channels`", [], async (error, channels) => {
                if(error) throw error;
                console.log(channels);
                for (let index = 0; index < channels.length; index++) {
                    let channel = channels[index];
                    await client.timeout(1000);
                    console.log("Creating Channel: " + channel.name);
                    message.guild.channels.create(channel.name, {
                            type: channel.type,
                            topic: channel.topic,
                            nsfw: channel.nsfw,
                            rateLimitPerUser: channel.ratelimit,
                            permissionOverwrites: JSON.parse(channel.permissions),
                            position: channel.position
                        }
                    );

                }               
            })   
            
            
        }
    });
}