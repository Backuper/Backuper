const colors = require("colors");

module.exports = async (client) => {
   //let guilds =  client.shard.fetchClientValues('guilds.cache.size')
   //console.log(guilds)
    let config = client.config
    console.log("Logged in as: ".rainbow + client.user.tag.rainbow);
    client.user.setStatus(`${client.config.status}`);
    let activities = config.activities;
  setInterval(function() {
    let activityRaw = activities[Math.floor(Math.random() * activities.length)];
    let activity = activityRaw.replace("$prefix", config.prefix).replace("$guilds", client.guilds.cache.size).replace("$users", client.users.size)
    client.user.setActivity(activity, {type: config.activityType});
  }, 12000);
};