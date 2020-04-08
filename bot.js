const { ShardingManager } = require("discord.js")

let manager = new ShardingManager()

manager.spawn(1)