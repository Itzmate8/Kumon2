const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Itzmate:Shravan2010@discordbotmongodb.rl23i.mongodb.net/Data', { useNewUrlParser: true, useUnifiedTopology: true})



const client = new Discord.Client();


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('Itzmate is gay\n my prefix is >', { type: 'PLAYING' })
	.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
	.catch(console.error);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});




client.on('message', message => {
	// Ignore messages that aren't from a guild
	if (!message.guild) return;
  
	// if the message content starts with "!ban"
	if (message.content.startsWith('>ban')) {
	  // Assuming we mention someone in the message, this will return the user
	  // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
	  const user = message.mentions.users.first();
	  // If we have a user mentioned
	  if (user) {
		// Now we get the member from the user
		const member = message.guild.member(user);
		// If the member is in the guild
		if (member) {
		  /**
		   * Ban the member
		   * Make sure you run this on a member, not a user!
		   * There are big differences between a user and a member
		   * Read more about what ban options there are over at
		   * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
		   */
		  member
			.ban({
			  reason: 'They were bad!',
			})
			.then(() => {
			  // We let the message author know we were able to ban the person
			  message.reply(`Successfully banned ${user.tag}`);
			})
			.catch(err => {
			  // An error happened
			  // This is generally due to the bot not being able to ban the member,
			  // either due to missing permissions or role hierarchy
			  message.reply('I was unable to ban the member');
			  // Log the error
			  console.error(err);
			});
		} else {
		  // The mentioned user isn't in this guild
		  message.reply("That user isn't in this guild!");
		}
	  } else {
		// Otherwise, if no user was mentioned
		message.reply("You didn't mention the user to ban!");
	  }
	}
  });

  client.on('message', message => {
	// Ignore messages that aren't from a guild
	if (!message.guild) return;
  
	// If the message content starts with "!kick"
	if (message.content.startsWith('!kick')) {
	  // Assuming we mention someone in the message, this will return the user
	  // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
	  const user = message.mentions.users.first();
	  // If we have a user mentioned
	  if (user) {
		// Now we get the member from the user
		const member = message.guild.member(user);
		// If the member is in the guild
		if (member) {
		  /**
		   * Kick the member
		   * Make sure you run this on a member, not a user!
		   * There are big differences between a user and a member
		   */
		  member
			.kick('Optional reason that will display in the audit logs')
			.then(() => {
			  // We let the message author know we were able to kick the person
			  message.reply(`Successfully kicked ${user.tag}`);
			})
			.catch(err => {
			  // An error happened
			  // This is generally due to the bot not being able to kick the member,
			  // either due to missing permissions or role hierarchy
			  message.reply('I was unable to kick the member');
			  // Log the error
			  console.error(err);
			});
		} else {
		  // The mentioned user isn't in this guild
		  message.reply("That user isn't in this guild!");
		}
		// Otherwise, if no user was mentioned
	  } else {
		message.reply("You didn't mention the user to kick!");
	  }
	}
  });





client.login(token);