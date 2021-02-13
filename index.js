const Twit = require("twit");
const csv = require("csv-parser");
const fs = require("fs");
require("dotenv").config();
const results = [];

const T = new Twit({
	consumer_key: process.env.API_KEY,
	consumer_secret: process.env.API_KEY_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

console.log("access granted...");

fs.createReadStream("n1.csv")
	.pipe(csv())
	.on("data", (data) => results.push(data))
	.on("end", () => {
		let index = 0;
		setInterval(() => {
			// do tweets
			let currentTwt = results[index];

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
		}, 1000 * 60 * 30); // millisecond * second * minutes * hour * day
	});
