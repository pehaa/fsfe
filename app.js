const http = require("http");

http
	.createServer(function (req, res) {
		res.write(
			"Pajka on the way to being a full stack engineer! Close your eyes! One more change! Is cron running?"
		);
		res.end();
	})
	.listen(3000);

console.log("Server started on port 3000");
