const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const fileUpload = require("express-fileupload");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let fruits = [
  {
    id: "11",
    name: "banana",
    price: 20,
  },
  {
    id: "22",
    name: "apple",
    price: 90,
  },
  {
    id: "33",
    name: "mango",
    price: 50,
  },
];

app.get("/api/v1/hello", (req, res) => {
  res.send("hello from abhinav");
});

app.get("/api/v1/mart", (req, res) => {
  res.send({ id: "55", name: "guava", price: 30 });
});

app.get("/api/v1/fruits", (req, res) => {
  res.send(fruits);
});

app.get("/api/v1/allFruits/:fruitId", (req, res) => {
  const myFruit = fruits.find((fruit) => fruit.id === req.params.fruitId);
  res.send(myFruit);
});

app.post("/api/v1/addFruit", (req, res) => {
  console.log(req.body);
  fruits.push(req.body); // Before pushing, do proper validation check
  res.send(true);
});

app.get("/api/v1/stringQuery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;
  res.send({ location, device });
});

app.post("/api/v1/imageUpload", (req, res) => {
  const file = req.files.file;
  let path = __dirname + "/images/" + file.name;
  console.log(file);
  
  file.mv(path, (err) => {
    if (err)
      return res.status(500).send(err);
    res.send('Image uploaded!');
  });
});


app.listen(3000, () => console.log(`Server is running at port 3000...`));
