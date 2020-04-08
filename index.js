const { Client, Collection } = require("discord.js")
const fs = require("fs")
require("dotenv").config();
let cmdDir = fs.readdirSync("./commands/")

let client = new Client()
client.commands = new Collection()
client.groups = []

for(let dir of CmdDir) {
    client.groups.push(dir)
    console.log("Loading command category " + dir + ".")
    let group = fs.readdirSync(`./commands/${dir}`)
    for (let commandFile of group) {
        console.log("Loading command " + dir + "/" + commandFile.split(".")[0] + ".")
        if(!commandFile.endsWith(".js")) {
            return console.log("No Commands")
        }
        let cmd = require(`./commands/${dir}/${commandFile}`)
        client.commands.set(commandFile.split(".")[0], cmd)
    }
}
f
fs.readdirSync("./events", (err, files) => {
    if(err) {
        return console.log(err)
    }
    files.forEach((file) => {
        console.log("Loading event " + file.split(".")[0] + ".");
        const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    })
})

client.login(process.env.TOKEN)