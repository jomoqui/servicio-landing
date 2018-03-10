var express = require("express") //Express para coger las peticiones http
var app = express()
var bodyParser = require('body-parser') //Lo que hace es tranformar el contenido que envio en un JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose") //Conectarse con la bbdd de mongo
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Landing");
var nameSchema = new mongoose.Schema({ //creamos el esquema de contenido
    nombre: String,
    email: String
});
var NewUser = mongoose.model("NewUser", nameSchema);

app.get("/", (req, res) => {    // Mostramos el contenido del index html para que se vea en la web, estamos enviando el contenido
    res.sendFile(__dirname + "/index.html");
});


app.post("/addname", (req, res) => {  //lo que hacemos es recuperar la información que se ha metido (POST))
    var myData = new NewUser(req.body); // Creamos la variable NewUser que es donde se metera el contenido
    myData.save()
        .then(item => { //Viendo la respuesta de la promesa con then hacemos la funcion que nos devuelva si ha sido guardado
            res.send("Nombre guardado");
        })
        .catch(err => {  //si nos devuelve un 400 que muestre porque
            res.status(400).send("No guardado");
        });
});

app.listen(3000, () => {
    console.log("Server listening on port " + 3000);
});
