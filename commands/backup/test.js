var randomstring = require("randomstring");
module.exports.run = async (client, args, cmd, message) => {
    User.create({
        id: message.member.id,
        backupid: randomstring.generate(10)
    })
    message.channel.send("Done!")
}