const express = require("express");
const app = express();

app.get("/", function (request, response) {
  response.send("Yay Node!");
});

app.get("/chocolate", function (request, response) {
  const amount = request.query.amount || 0; // access the amount parameter from the query string
  response.send(`Here's your ${amount} chocolate(s)! 🍫`); // return the desired amount of chocolate
});

app.get("/multiply", function (request, response) {
  const value1 = parseFloat(request.query.value1) || 0; // access the value1 and value2 parameters from the query string
  const value2 = parseFloat(request.query.value2) || 0;
  const result = value1 * value2; // multiply both values

  response.send(
    `The result of multiplying ${value1} and ${value2} is ${result}.` // return result
  );
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
