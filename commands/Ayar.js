const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const conf = require("../config.js") 

module.exports.run = async (client, message, args) => {

let yes = conf.yes;
let no = conf.no;

let embed = new Discord.MessageEmbed().setFooter("Reawen tarafından geliştirildi.", message.author.avatarURL({dynamic: true})).setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))

let rolKoruma = db.fetch(`rolKoruması.${message.guild.id}`);
let kanalKoruma = db.fetch(`kanalKoruması.${message.guild.id}`);
let güncellemeKoruma = db.fetch(`güncellemeKoruması.${message.guild.id}`);
let banKoruma = db.fetch(`banKoruması.${message.guild.id}`);
let kickKoruma = db.fetch(`kickKoruması.${message.guild.id}`);
let botKoruma = db.fetch(`botKoruması.${message.guild.id}`);
let urlKoruma = db.fetch(`urlKoruması.${message.guild.id}`);

let seçim = args[2] || "ban";

if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(no)

if (!args[0]) return message.channel.send(embed.setDescription(`
:no_entry_sign: Bir yanlışlık yaptın! Aşağıdaki değişkenleri kullanarak daha kolay çözüm yolu bulabilirsin!

\`${conf.prefix}ayar rol/kanal/güncelleme/ban/kick/bot/url aç/kapat jail/ban\`

\`>\` Rol: Rol silme/açma koruması.
\`>\` Kanal: Kanal silme/açma koruması.
\`>\` Güncelleme: Sunucu güncelleme koruması. ( **Icon, Url, Bölge vs.** )
\`>\` Ban: Ban atma/açma koruması.
\`>\` Kick: Kick atma koruması.
\`>\` Bot: Sunucuya bot ekleme koruması.
\`>\` Url: Url değişme koruması.
`))



  
if (args[0] === "rol") {
if (args[1] === "aç") {
if (!seçim) return message.channel.send(embed.setDescription(`
:no_entry_sign: Bir yanlışlık yaptın! Aşağıdaki değişkenleri kullanarak daha kolay çözüm yolu bulabilirsin!

\`${conf.prefix}ayar rol/kanal/güncelleme/ban/kick/bot/url aç/kapat jail/ban\`

\`>\` Rol: Rol silme/açma koruması.
\`>\` Kanal: Kanal silme/açma koruması.
\`>\` Güncelleme: Sunucu güncelleme koruması. ( **Icon, Url, Bölge vs.** )
\`>\` Ban: Ban atma/açma koruması.
\`>\` Kick: Kick atma koruması.
\`>\` Bot: Sunucuya bot ekleme koruması.
\`>\` Url: Url değişme koruması.
`))
if(rolKoruma) return message.channel.send(embed.setDescription(`Rol koruması zaten aktif halde.`))
db.set(`rolKoruması.${message.guild.id}`, seçim)
message.channel.send(embed.setDescription(`**Rol** koruması başarıyla aktif edildi. Rol **ekleyen**, **kaldıran** kişi **${seçim}** cezası alacak!`))
return;
} else if (args[1] === "kapat") {
if(!rolKoruma) return message.channel.send(embed.setDescription(`Rol koruması zaten devre dışı halde.`))
db.delete(`rolKoruması.${message.guild.id}`)
message.channel.send(embed.setDescription(`**Rol** koruması devre dışı bırakıldı.`))
return;
}
return;
}

if (args[0] === "kanal") {
if (args[1] === "aç") {
if (!seçim || !args[1]) return message.channel.send(embed.setDescription(`
:no_entry_sign: Bir yanlışlık yaptın! Aşağıdaki değişkenleri kullanarak daha kolay çözüm yolu bulabilirsin!

\`${conf.prefix}ayar rol/kanal/güncelleme/ban/kick/bot/url aç/kapat jail/ban\`

\`>\` Rol: Rol silme/açma koruması.
\`>\` Kanal: Kanal silme/açma koruması.
\`>\` Güncelleme: Sunucu güncelleme koruması. ( **Icon, Url, Bölge vs.** )
\`>\` Ban: Ban atma/açma koruması.
\`>\` Kick: Kick atma koruması.
\`>\` Bot: Sunucuya bot ekleme koruması.
\`>\` Url: Url değişme koruması.
`))
if(kanalKoruma) return message.channel.send(embed.setDescription(`Kanal koruması zaten aktif halde.`))
db.set(`kanalKoruması.${message.guild.id}`, seçim)
message.channel.send(embed.setDescription(`**Kanal** koruması başarıyla aktif edildi. kanal **ekleyen**, **kaldıran** kişi **${seçim}** cezası alacak!`))
return;
} else if (args[1] === "kapat") {
if(!kanalKoruma) return message.channel.send(embed.setDescription(`Kanal koruması zaten devre dışı halde.`))
db.delete(`kanalKoruması.${message.guild.id}`)
message.channel.send(embed.setDescription(`**Kanal** koruması devre dışı bırakıldı.`))
return;
}
return;
}

if (args[0] === "güncelleme") {
if (args[1] === "aç") {
if (!seçim) return message.channel.send(embed.setDescription(`
:no_entry_sign: Bir yanlışlık yaptın! Aşağıdaki değişkenleri kullanarak daha kolay çözüm yolu bulabilirsin!
    
\`${conf.prefix}ayar rol/kanal/güncelleme/ban/kick/bot/url aç/kapat jail/ban\`
    
\`>\` Rol: Rol silme/açma koruması.
\`>\` Kanal: Kanal silme/açma koruması.
\`>\` Güncelleme: Sunucu güncelleme koruması. ( **Icon, Url, Bölge vs.** )
\`>\` Ban: Ban atma/açma koruması.
\`>\` Kick: Kick atma koruması.
\`>\` Bot: Sunucuya bot ekleme koruması.
\`>\` Url: Url değişme koruması.
`))
if(güncellemeKoruma) return message.channel.send(embed.setDescription(`Güncelleme koruması zaten aktif halde.`))
db.set(`güncellemeKoruması.${message.guild.id}`, seçim)
message.channel.send(embed.setDescription(`**Güncelleme** koruması başarıyla aktif edildi. Güncelleme yapan kişi **${seçim}** cezası alacak!`))
return;
} else if (args[1] === "kapat") {
if(!güncellemeKoruma) return message.channel.send(embed.setDescription(`Güncelleme koruması zaten devre dışı halde.`))
db.delete(`güncellemeKoruması.${message.guild.id}`)
message.channel.send(embed.setDescription(`**Güncelleme** koruması devre dışı bırakıldı.`))
return;
}
return;
}


if (args[0] === "ban") {
if (args[1] === "aç") {
if (!seçim) return message.channel.send(embed.setDescription(`
:no_entry_sign: Bir yanlışlık yaptın! Aşağıdaki değişkenleri kullanarak daha kolay çözüm yolu bulabilirsin!
    
\`${conf.prefix}ayar rol/kanal/güncelleme/ban/kick/bot/url aç/kapat jail/ban\`
    
\`>\` Rol: Rol silme/açma koruması.
\`>\` Kanal: Kanal silme/açma koruması.
\`>\` Güncelleme: Sunucu güncelleme koruması. ( **Icon, Url, Bölge vs.** )
\`>\` Ban: Ban atma/açma koruması.
\`>\` Kick: Kick atma koruması.
\`>\` Bot: Sunucuya bot ekleme koruması.
\`>\` Url: Url değişme koruması.
    `))
if(banKoruma) return message.channel.send(embed.setDescription(`Ban koruması zaten aktif halde.`))
db.set(`banKoruması.${message.guild.id}`, seçim)
message.channel.send(embed.setDescription(`**Ban** koruması başarıyla aktif edildi. Ban **atan**, **açan** kişi **${seçim}** cezası alacak!`))
return;
} else if (args[1] === "kapat") {
if(!banKoruma) return message.channel.send(embed.setDescription(`Ban koruması zaten devre dışı halde.`))
db.delete(`banKoruması.${message.guild.id}`)
message.channel.send(embed.setDescription(`**Ban** koruması devre dışı bırakıldı.`))
return;
}
return;
}


if (args[0] === "kick") {
if (args[1] === "aç") {
if (!seçim) return message.channel.send(embed.setDescription(`
:no_entry_sign: Bir yanlışlık yaptın! Aşağıdaki değişkenleri kullanarak daha kolay çözüm yolu bulabilirsin!
    
\`${conf.prefix}ayar rol/kanal/güncelleme/ban/kick/bot/url aç/kapat jail/ban\`
    
\`>\` Rol: Rol silme/açma koruması.
\`>\` Kanal: Kanal silme/açma koruması.
\`>\` Güncelleme: Sunucu güncelleme koruması. ( **Icon, Url, Bölge vs.** )
\`>\` Ban: Ban atma/açma koruması.
\`>\` Kick: Kick atma koruması.
\`>\` Bot: Sunucuya bot ekleme koruması.
\`>\` Url: Url değişme koruması.
    `))
if(kickKoruma) return message.channel.send(embed.setDescription(`Kick koruması zaten aktif halde.`))
db.set(`kickKoruması.${message.guild.id}`, seçim)
message.channel.send(embed.setDescription(`**Kick** koruması başarıyla aktif edildi. Kick **atan** kişi **${seçim}** cezası alacak!`))
return;
} else if (args[1] === "kapat") {
if(!kickKoruma) return message.channel.send(embed.setDescription(`Kick koruması zaten devre dışı halde.`))
db.delete(`kickKoruması.${message.guild.id}`)
message.channel.send(embed.setDescription(`**Kick** koruması devre dışı bırakıldı.`))
return;
}
return;
}

if (args[0] === "bot") {
if (args[1] === "aç") {
if (!seçim) return message.channel.send(embed.setDescription(`
:no_entry_sign: Bir yanlışlık yaptın! Aşağıdaki değişkenleri kullanarak daha kolay çözüm yolu bulabilirsin!
    
\`${conf.prefix}ayar rol/kanal/güncelleme/ban/kick/bot/url aç/kapat jail/ban\`
    
\`>\` Rol: Rol silme/açma koruması.
\`>\` Kanal: Kanal silme/açma koruması.
\`>\` Güncelleme: Sunucu güncelleme koruması. ( **Icon, Url, Bölge vs.** )
\`>\` Ban: Ban atma/açma koruması.
\`>\` Kick: Kick atma koruması.
\`>\` Bot: Sunucuya bot ekleme koruması.
\`>\` Url: Url değişme koruması.
`))
if(botKoruma) return message.channel.send(embed.setDescription(`Bot koruması zaten aktif halde.`))
db.set(`botKoruması.${message.guild.id}`, seçim)
message.channel.send(embed.setDescription(`**Bot** koruması başarıyla aktif edildi. Bot **ekleyen** kişi **${seçim}** cezası alacak!`))
return;
} else if (args[1] === "kapat") {
if(!botKoruma) return message.channel.send(embed.setDescription(`Bot koruması zaten devre dışı halde.`))
db.delete(`botKoruması.${message.guild.id}`)
message.channel.send(embed.setDescription(`**Bot** koruması devre dışı bırakıldı.`))
return;
}
return;
}
    
if (args[0] === "url") {
if (args[1] === "aç") {
if (!seçim) return message.channel.send(embed.setDescription(`
:no_entry_sign: Bir yanlışlık yaptın! Aşağıdaki değişkenleri kullanarak daha kolay çözüm yolu bulabilirsin!

\`${conf.prefix}ayar rol/kanal/güncelleme/ban/kick/bot/url aç/kapat jail/ban\`

\`>\` Rol: Rol silme/açma koruması.
\`>\` Kanal: Kanal silme/açma koruması.
\`>\` Güncelleme: Sunucu güncelleme koruması. ( **Icon, Url, Bölge vs.** )
\`>\` Ban: Ban atma/açma koruması.
\`>\` Kick: Kick atma koruması.
\`>\` Bot: Sunucuya bot ekleme koruması.
\`>\` Url: Url değişme koruması.
`))
if(urlKoruma) return message.channel.send(embed.setDescription(`URL koruması zaten aktif halde.`))
db.set(`urlKoruması.${message.guild.id}`, seçim)
message.channel.send(embed.setDescription(`**URL** koruması başarıyla aktif edildi. URL **değişen** kişi **${seçim}** cezası alacak!`))
return;
} else if (args[1] === "kapat") {
if(!urlKoruma) return message.channel.send(embed.setDescription(`URL koruması zaten devre dışı halde.`))
db.delete(`urlKoruması.${message.guild.id}`)
message.channel.send(embed.setDescription(`**URL** koruması devre dışı bırakıldı.`))
return;
}
return;
}

};

exports.config = {
  name: "ayar",
  guildOnly: true,
  aliases: ["settings"],
};