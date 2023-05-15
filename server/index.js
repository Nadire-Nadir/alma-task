const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (request, response) => {
    response.json({"message": "Hello!"});
});

app.get("/api/coffees", (request, response) => {
    const keyword = request.query.keyword;
    const url = keyword
        ? `http://localhost:3004/coffees?q=${keyword}`
        : "http://localhost:3004/coffees";
    axios
        .get(url)
        .then((res) => {
            response.json(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post("/api/coffees", (request, response) => {
    const body = request.body;

    if (!body.name || !body.weight || !body.price || !body.level) {
      return response.status(400).json({
        error: "Name or number or roasting level is missing!",
      });
    }

    const coffee = {
        id: uuidv4(),
        name: body.name,
        weight: body.weight,
        price: body.price,
        level: body.level,
    };

    axios
        .post("http://localhost:3004/coffees", coffee)
        .then((res) => {
            response.json(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
