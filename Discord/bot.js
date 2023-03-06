// discord.js モジュールのインポート
const Discord = require('discord.js');

// Discord Clientのインスタンス作成
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

// トークンの用意
const token = 'MTAxMzA0NjU4Nzk3NjU5NzYwNg.Gh069l.Jj6P9On08THc_huyvgwFFtO0o_rP4slAc-1NMA';

// 起動するとconsoleにready...と表示される
client.on('ready', () => {
    console.log('ready...');
});

client.on('messageCreate', async message => {
    console.log(message.content);
    if(message.author.bot) return; //BOTのメッセージには反応しない

    if(message.content === "/hello"){ //送られたメッセージが /helloだったら
        message.channel.send("HELLO!");
        //メッセージが送られたチャンネルに HELLO!と送信する
    }else{
        message.channel.send(message.content);
    }
})

// Discordへの接続
client.login(token);