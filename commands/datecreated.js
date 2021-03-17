module.exports = {
	name: 'server',
	description: 'Display info about this server.',
	execute(message) {
		message.channel.send(`This server was created on: ${message.guild.createdAt}`);
	},
};