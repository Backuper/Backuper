module.exports = async (client, userid, channel, con) => {
    const { MessageEmbed } = require("discord.js")
    con.query("SELECT * FROM `users` WHERE userid = ?", [userid], async (error, result) => {
        let text
        if (result.length == 1) {
            for (let r of result) {
                text += r.backupid + " | " + r.servername + "\n"
            }
            let embed = new MessageEmbed()
                .setTitle("Backup - List")
                .setDescription(text)
            return channel.send(embed)
        } else {
            let embed = new MessageEmbed()
                .setTitle("Backup - List")
                .setDescription("You don't have any Backups")
            return channel.send(embed)
        }
    
    })
}