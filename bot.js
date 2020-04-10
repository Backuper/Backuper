const { ShardingManager } = require("discord.js")

let manager = new ShardingManager()

manager.on("sharCreate")

manager.spawn(1)

