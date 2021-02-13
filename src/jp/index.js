const Twit = require("twit");
const csv = require("csv-parser");
const fs = require("fs");
require("dotenv").config();
const results = [];

const T = new Twit({
	consumer_key: process.env.API_KEY_JA,
	consumer_secret: process.env.API_KEY_SECRET_JA,
	access_token: process.env.ACCESS_TOKEN_JA,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET_JA,
});

console.log("access japanese bot granted...");

function japanese(time) {
	fs.createReadStream(`${__dirname}/jlpt.csv`)
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
						status: `Word = ${currentTwt.expression}\nReading = ${currentTwt.reading}\nMeaning = ${currentTwt.meaning} \nTags = ${currentTwt.tags}`,
					},
					(err, data) => {
						if (err) console.log(err);
					}
				);
				
				console.log("tweet posted...");

				index += 1;

				// to prevent undefined when index out of range
				if (index == results.length) index = 0;
			}, time); // millisecond * second * minutes * hour * day
		});
}

module.exports = japanese