const Discord = require("discord.js") 
const client = new Discord.Client();    
const config = require("./config.js") 
const conf = require("./config.js") 
const db = require("quick.db")
const fs = require("fs");                
require('./util/Loader.js')(client);    
const request = require("request");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();  
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);             
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {                     
    let props = require(`./commands/${f}`);  
    console.log(`${props.config.name} komutu yüklendi.`);     
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {          
      client.aliases.set(alias, props.config.name);
    });
  });
})

client.login(config.token)

let yes = conf.yes;
let no = conf.no;

let jailRolu = config.jailRolu;

const embed = new Discord.MessageEmbed().setFooter("Reawen tarafından geliştirildi.").setColor("010000")

let s = "sunucu id"

const güvenli = ["botun idsi", "kendi idniz"];


let rolKoruma = db.fetch(`rolKoruması.${s}`);
let kanalKoruma = db.fetch(`kanalKoruması.${s}`);
let güncellemeKoruma = db.fetch(`güncellemeKoruması.${s}`);
let banKoruma = db.fetch(`banKoruması.${s}`);
let kickKoruma = db.fetch(`kickKoruması.${s}`);
let botKoruma = db.fetch(`botKoruması.${s}`);
let urlKoruma = db.fetch(`urlKoruması.${s}`);
let logKanalı = conf.log;

client.on("guildBanAdd", async (sunucu, sorumluu) => {
const log = await sunucu.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" });
const audit = log.entries.first();
const hedef = audit.target;
const sorumlu = audit.executor.id;
const logKanalı = config.log;
if (banKoruma) {
if(güvenli.includes(sorumlu)) return;
if (banKoruma === "ban") {
sunucu.members.cache.get(sorumlu).ban({reason: "Reawen Ban Koruma"});
sunucu.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Üye banlandı!").setDescription(`${sunucu.members.cache.get(sorumlu)} isimli kullanıcı \`${hedef.tag}\` isimli üyeyi sunucudan yasakladı!`))
} else if (banKoruma === "jail") {
sunucu.members.cache.get(sorumlu).roles.set([jailRolu])
sunucu.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Üye banlandı!").setDescription(`${sunucu.members.cache.get(sorumlu)} isimli kullanıcı \`${hedef.tag}\` isimli üyeyi sunucudan yasakladı!`))
}
}
})


client.on("guildMemberRemove", async (hedeff) => {
const sunucu = hedeff.guild;
const log = await sunucu.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" });
const audit = log.entries.first();
const hedef = audit.target;
const sorumlu = audit.executor.id;
const logKanalı = config.log;
if (kickKoruma) {
if (kickKoruma === "ban") {
if(güvenli.includes(sorumlu)) return;
sunucu.members.cache.get(sorumlu).ban({reason: "Reawen Kick Koruma"});
sunucu.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Üye atıldı!").setDescription(`${sunucu.members.cache.get(sorumlu)} isimli kullanıcı \`${hedef.tag}\` isimli üyeyi sunucudan attı!`))
} else if (kickKoruma === "jail") {
sunucu.members.cache.get(sorumlu).roles.set([jailRolu])
sunucu.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Üye atıldı!").setDescription(`${sunucu.members.cache.get(sorumlu)} isimli kullanıcı \`${hedef.tag}\` isimli üyeyi sunucudan attı!`))
}
}
})

client.on("channelCreate", async (kanal) => {
const sunucu = kanal.guild;
const log = await sunucu.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" });
const audit = log.entries.first();
const hedef = audit.target;
const sorumlu = audit.executor.id;
const logKanalı = config.log;

sunucu.fetchAuditLogs().then(async (logs) => {
let adam = logs.entries.first().executor.id
if(logs.entries.first().action === `CHANNEL_CREATE`) {
if (kanalKoruma) {
if(güvenli.includes(adam)) return;
kanal.delete({ reason: "Reawen Kanal Koruma" });
if (kanalKoruma === "ban") {
sunucu.members.cache.get(adam).ban({reason: "Reawen Kanal Koruma"});
sunucu.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Kanal açıldı!").setDescription(`${sunucu.members.cache.get(adam)} kanal oluşturduğu için banlandı! `))
} else if (kanalKoruma === "jail") {
sunucu.members.cache.get(adam).roles.set([jailRolu])
sunucu.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Kanal açıldı!").setDescription(`${sunucu.members.cache.get(adam)} kanal oluşturduğu için cezalandırıldı! `))
}
}
}
})
})

client.on("channelDelete", async (kanal) => {
const sunucu = kanal.guild;
const log = await sunucu.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" });
const audit = log.entries.first();
const hedef = audit.target;
const sorumlu = audit.executor.id;
const logKanalı = config.log;
    
sunucu.fetchAuditLogs().then(async (logs) => {
let adam = logs.entries.first().executor.id
if(logs.entries.first().action === `CHANNEL_DELETE`) {
if (kanalKoruma) {
if(güvenli.includes(adam)) return;
await kanal.clone({ reason: "Reawen Kanal Koruma" }).then(async ch => {
if (kanal.parentID != null) await ch.setParent(kanal.parentID);
await ch.setPosition(kanal.position);
if (kanal.type == "category") await kanal.guild.channels.cache.filter(k => k.parentID == kanal.id).forEach(x => x.setParent(ch.id));
});
if (kanalKoruma === "ban") {
sunucu.members.cache.get(adam).ban({reason: "Reawen Kanal Koruma"});
sunucu.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Kanal açıldı!").setDescription(`${sunucu.members.cache.get(adam)} kanal siliği için banlandı! `))
} else if (kanalKoruma === "jail") {
sunucu.members.cache.get(adam).roles.set([jailRolu])
sunucu.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Kanal açıldı!").setDescription(`${sunucu.members.cache.get(adam)} kanal sildiği için cezalandırıldı! `))
}
}
}
})
})

client.on("roleCreate", async (kanal) => {
const sunucu = kanal.guild;
const log = await sunucu.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" });
const audit = log.entries.first();
const hedef = audit.target;
const sorumlu = audit.executor.id;
const logKanalı = config.log;
        
sunucu.fetchAuditLogs().then(async (logs) => {
let adam = logs.entries.first().executor.id
if(logs.entries.first().action === `ROLE_CREATE`) {
if (rolKoruma) {
if(güvenli.includes(adam)) return;
kanal.delete({ reason: "Reawen Rol Koruma" });
if (rolKoruma === "ban") {
sunucu.members.cache.get(adam).ban({reason: "Reawen Rol Koruma"});
sunucu.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Rol açıldı!").setDescription(`${sunucu.members.cache.get(adam)} rol açtığı için banlandı! `))
} else if (rolKoruma === "jail") {
sunucu.members.cache.get(adam).roles.set([jailRolu])
sunucu.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Rol açıldı!").setDescription(`${sunucu.members.cache.get(adam)} rol açtığı için cezalandırıldı! `))
}
}
}
})
})

client.on("roleDelete", async (kanal) => {
const sunucu = kanal.guild;
const log = await sunucu.fetchAuditLogs({ limit: 1, type: "MEMBER_KICK" });
const audit = log.entries.first();
const hedef = audit.target;
const sorumlu = audit.executor.id;
const logKanalı = config.log;
            
sunucu.fetchAuditLogs().then(async (logs) => {
let adam = logs.entries.first().executor.id
if(logs.entries.first().action === `ROLE_DELETE`) {
if (rolKoruma) {
if (rolKoruma === "ban") {
if(güvenli.includes(adam)) return;
sunucu.members.cache.get(adam).ban({reason: "Reawen Rol Koruma"});
sunucu.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Rol silindi!").setDescription(`${sunucu.members.cache.get(adam)} rol sildiği için banlandı! `))
} else if (rolKoruma === "jail") {
sunucu.members.cache.get(adam).roles.set([jailRolu])
sunucu.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Rol silindi!").setDescription(`${sunucu.members.cache.get(adam)} rol sildiği için cezalandırıldı! `))
}
}
}
})
})

client.on("guildUpdate", async (reawEski, reawYeni) => {
if (güncellemeKoruma) {
let entry = await reawYeni.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
let adam = entry.executor.id;
if(güvenli.includes(adam)) return;
if (reawYeni.name !== reawEski.name) reawYeni.setName(reawEski.name);
if (reawYeni.iconURL({dynamic: true, size: 2048}) !== reawEski.iconURL({dynamic: true, size: 2048})) reawYeni.setIcon(reawEski.iconURL({dynamic: true, size: 2048}));
if (güncellemeKoruma === "ban") {
entry.executor.ban({reason: "Reawen Güncelleme Koruma"})
reawYeni.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Sunucu güncellendi!").setDescription(`${reawYeni.members.cache.get(adam)} sunucuyu güncellediği için banlandı! `))
} else if (güncellemeKoruma === "jail") {
reawYeni.members.cache.get(entry.executor.id).roles.set([jailRolu]);
reawYeni.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Sunucu güncellendi!").setDescription(`${reawYeni.members.cache.get(adam)} sunucuyu güncellediği için cezalandırıldı! `))
}
}
});

client.on("guildMemberAdd", async member => {
let entry = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
let adam = entry.executor.id;
if (botKoruma) {
if (member.user.bot) {
if (botKoruma === "ban") {
member.guild.members.cache.get(entry.executor.id).ban({reason: "Reawen Bot Koruma"})
member.guild.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Bot eklendi!").setDescription(`${member.guild.members.cache.get(adam)} bot eklediği için için banlandı! `))
} else if (botKoruma === "jail") {
member.guild.members.cache.get(entry.executor.id).roles.set([jailRolu])
member.guild.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: Bot eklendi!").setDescription(`${member.guild.members.cache.get(adam)} bot eklediği için için cezalandırıldı! `))
}
}
}
})

client.on("guildUpdate", async (reawEski, reawYeni) => {


reawYeni.fetchAuditLogs().then(async (audit) => {
var reawUye = audit.entries.first().executor
if(reawEski.vanityURLCode !== reawYeni.vanityURLCode) {
if (urlKoruma) {
request({
method: "PATCH",
url: `https://discord.com/api/guilds/${reawYeni.id}/vanity-url`,
headers: {
Authorization: `Reawen ${client.token} tokeni de birakalim suraya`},
json: {code: `${reawEski.vanityURLCode}`}
});
if (urlKoruma === "ban") {
if(güvenli.includes(reawUye.id)) return;
reawYeni.members.cache.get(reawUye.id).ban({reason: "Reawen URL Koruma"})
reawYeni.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: URL değişti!").setDescription(`${reawYeni.members.cache.get(reawUye.id)} URL değiştiği için için banlandı! `))
} else if (urlKoruma === "jail") {
if(güvenli.includes(reawUye.id)) return;
reawYeni.channels.cache.get(logKanalı).send(embed.setTitle(":no_entry_sign: URL değişti!").setDescription(`${reawYeni.members.cache.get(reawUye.id)} URL değiştiği için için cezalandırıldı! `))
reawYeni.members.cache.get(reawUye.id).roles.set([jailRolu]);
}
  
}
reawYeni.members.cache.get(reawUye.id).ban({reason: "kNaves knvs knv kn k diye url degiscez herhalde aq"})
}
})
})