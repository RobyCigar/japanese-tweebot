const Twit = require("twit");
const csv = require("csv-parser");
const fs = require("fs");
require("dotenv").config();
const results = [];

const T = new Twit({
	consumer_key: process.env.API_KEY_CN,
	consumer_secret: process.env.API_KEY_SECRET_CN,
	access_token: process.env.ACCESS_TOKEN_CN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET_CN,
});

console.log("access for chinese bot granted...");

function chinese(time) {
	fs.createReadStream(`${__dirname}/hsk.csv`)
		.pipe(csv())
		.on("data", (data) => results.push(data))
		.on("end", () => {
			let index = 0;
			setInterval(() => {

				let currentTwt = results[index];

				// Post tweet
				T.post(
					"statuses/update",
					{
						status: `Word = ${currentTwt.sentence}\nReading = ${currentTwt.read}\nMeaning = ${currentTwt.meaning}`,
					},
					(err, data) => {
						if (err) console.log(err);
					}
				);

				console.log("tweet posted...");

				index += 1;

				// to prevent undefined when index out of range
				if (index == results.length) index = 0;
			}, time); 
		});
}

module.exports = chinese