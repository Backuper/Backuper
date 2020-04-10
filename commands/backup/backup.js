var randomstring = require("randomstring");
const { MessageEmbed } = require("discord.js")
let con = require("../../utils/database")
let backup = require("../../handlers/backuphandler")
module.exports.run = async (client, message, args) => {
    let values = ["create", "load", "list"]
    let value = args[0]
    //bc+backup load ID
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
            let backupid = randomstring.generate(10);
            await backup.create(client, backupid, message, args);

        }

        if(value.includes("load")){
            if(args[1]){
                backup.load(client, args[1], message, args)
            }else{
                let backuperrorembed = new MessageEmbed()
                .setTitle("Backup - Load")
                .setDescription("Please enter a Backupid")
                return message.channel.send(backuperrorembed)
            }
            
        }

        if(value.includes("list")) {
            backup.list(client, message.member.id, message.channel)
        }
        
    }
}