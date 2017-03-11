var TelegramBot = require('node-telegram-bot-api'),
	Cron =  require('cron').CronJob, //require подключает модуль,который скачади
	request =  require('request'),
	Entities =  require('html-entities').XmlEntiti, // чистит html в читаемый текст
	token = '355893125:AAHar_0dj5r_FIQnbCX5pQLjYFItuIKSLmc';

var bot = new TelegramBot(token, {
	polling: true, //poling true весит пока не закроем бота
	// эхо сервер
});

 

bot.on('message', function(msg) {
	
	//var id = msg.chat.id; // id нашего чата; console.log(msg); Чтобы посмотреть все команды функции. node index.js
	
	 var id = msg.from.id;// from.id id человека, который прислал сообщение
	 bot.sendMessage(id, msg.text); //exo server назад сообщение посылаем
	 console.log(msg);

})

var job = new Cron('0,30 * * * * *', function(){ // 0,30 * * * * * каждую 0секунду и 30 секунду   минуты присылать по документации пакета Cron
	//console.log('hi');
var chatId = 261260012,
	url = 'http://www.umori.li/api/random?site=bash.im&name=bash&num=1'

	request(url, function(error, response, body)   {

		var data = JSON.parse(body); // Node нам ответит не JSON форматом
		//console.log(data);
		bot.sendMessage(chatId, data[0].elementPureHtml);
		 
	});
//request(url ,fuction(){}) нпм реквест.Обратывает API адреса(url)и после выполняет функцию
});

job.start();