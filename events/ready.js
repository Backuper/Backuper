const colors = require("colors");

module.exports = async (client) => {
    console.log("Logged in as: ".rainbow + client.user.tag.rainbow);
};