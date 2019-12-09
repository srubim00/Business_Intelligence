const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "1234"));
const session = driver.session();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.post("/login", function (req, res) {
  var user = req.body.user;
  var password = req.body.password;

  var query = "MATCH (n:Persona) WHERE n.usuario='" + user + "' AND n.password='" + password + "' return n";


  const resultPromise = session.run(query);
  resultPromise.then(result => {
    session.close();

    if (result.records.length == 0) {
      res.send({ message: false })
    }
    else {
      var record = result.records[0].get(0).properties.usuario;
      res.send(record);

    }


  })
})

app.post("/usuarios", function (req, res) {
  var user = req.body.usuario;
  var nombre = req.body.nombre;
  var password = req.body.password;
  var nacimiento = req.body.nacimiento;
  var query = "CREATE (n:Persona{nombre:'" + nombre + "', nacimiento:" + nacimiento + ", usuario:'" + user + "', password:'" + password + "'})";


  const resultPromise = session.run(query);
  resultPromise.then(result => {
    session.close();
    res.send({ message: true })

  })
})

app.post("/aleatoria", function (req, res) {

  var query = "MATCH (n:Pizza) return n";
  var array = [];
  var session = driver.session();
  var pizza;

  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {

        array.push(record.get(0).properties);
      },
      onCompleted: function () {

        var pos = Math.floor(Math.random() * array.length);

        pizza = array[pos];

        query = "MATCH (p:Pizzeria)-[:OFRECE]->(n:Pizza) WHERE n.nombre='" + pizza.nombre + "' return p";
        session
          .run(query)
          .subscribe({
            onNext: function (record2) {

              array = [];
              array.push(record2.get(0).properties);
            },
            onCompleted: function () {

              session.close();
              pizza.pizzeria = array[0].nombre;
              pizza.direccion = array[0].direccion;
              pizza.telefono = array[0].telefono;
              res.send(pizza);

            },
            onError: function (error) {
              console.log(error);
            }
          });

      },
      onError: function (error) {
        console.log(error);
      }
    });
});



app.post("/puntuar", function (req, res) {
  var user = req.body.user;
  var pizza = req.body.pizza;
  var puntuacion = req.body.puntuacion;

  var query = " MATCH (p:Persona)-[v:VALORA]->(e:Pizza) WHERE p.usuario = '" + user + "' AND e.nombre='" + pizza + "' AND exists(v.valoración) RETURN v.valoración"

  var array = [];
  var session = driver.session();
  var pizza;
  var tiene = false;

  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {

        if (record.length != 0) {
          tiene = true;
        }

      },
      onCompleted: function () {
        if (tiene) {

          query = "MATCH(p:Persona)-[v:VALORA]->(e:Pizza) WHERE p.usuario='" + user + "' AND e.nombre='" + pizza + "' SET v.valoración=" + puntuacion;

        }
        else {
          query = "START n=node(*), m=node(*) where n.usuario = '" + user + "' and m.nombre = '" + pizza + "' create (n)-[:VALORA{valoración:" + puntuacion + "}]->(m)";
        }
        const resultPromise = session.run(query);
        resultPromise.then(result => {
          session.close();
          res.send({ message: true })

        })


      },
      onError: function (error) {
        console.log(error);
      }
    });
});


app.post("/pizzeria", function (req, res) {

  var query = "MATCH (p:Pizzeria)-[:OFRECE]->(n:Pizza) WHERE n.nombre=" + req.body.pizza + " return p";
  var session = driver.session();
  var array = [];
  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {
        array.push(record.get(0).properties);
      },
      onCompleted: function () {
        session.close();
        res.send(array[0]);
      },
      onError: function (error) {
        console.log(error);
      }
    });

})


app.post("/mio", function (req, res) {
  var user = req.body.user;
  var session = driver.session();
  var query = "MATCH (n:Persona{usuario:'" + user + "'})-[v:VALORA]->(p:Pizza)<-[:OFRECE]-(e:Pizzeria) return p,v.valoración,e";


  var array = [];
  var objeto;


  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {

        objeto = (record.get(0).properties);
        objeto.puntuacion = record.get(1).low;
        objeto.pizzeria = record.get(2).properties.nombre;
        objeto.direccion = record.get(2).properties.direccion;
        objeto.telefono = record.get(2).properties.telefono;


        array.push(objeto);

      },
      onCompleted: function () {
        session.close();
        res.send(array);

      },
      onError: function (error) {
        console.log(error);
      }
    });

});

app.post("/gente", function (req, res) {
  var user = req.body.user;
  var session = driver.session();
  var query = "MATCH (n:Persona)-[v:VALORA]->(p:Pizza)<-[:OFRECE]-(e:Pizzeria) return p,v.valoración,e";


  var array = [];
  var objeto;


  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {

        objeto = (record.get(0).properties);
        objeto.puntuacion = record.get(1).low;
        objeto.pizzeria = record.get(2).properties.nombre;
        objeto.direccion = record.get(2).properties.direccion;
        objeto.telefono = record.get(2).properties.telefono;

        array.push(objeto);
      },
      onCompleted: function () {

        session.close();
        res.send(array);

      },
      onError: function (error) {
        console.log(error);
      }
    });

});

app.post("/ingrediente", function (req, res) {
  var user = req.body.user;
  var ingrediente = req.body.ingrediente;
  var session = driver.session();
  var query = "MATCH (n:Pizzeria)-[:OFRECE]->(p:Pizza)-[:CONTIENE]->(i:Ingrediente) WHERE i.nombre='" + ingrediente + "' return p,n";


  var array = [];
  var objeto;


  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {

        objeto = (record.get(0).properties);
        objeto.pizzeria = record.get(1).properties.nombre;
        objeto.direccion = record.get(1).properties.direccion;
        objeto.telefono = record.get(1).properties.telefono;

        array.push(objeto);
      },
      onCompleted: function () {

        session.close();
        res.send(array);

      },
      onError: function (error) {
        console.log(error);
      }
    });

});

app.post("/item", function (req, res) {
  var user = req.body.user;
  var pizza = req.body.pizza;
  var session = driver.session();
  var query = "MATCH (p:Pizza)-[:CONTIENE]->(i:Ingrediente) WHERE p.nombre='" + pizza + "' return i";

  var array = [];


  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {

        array.push(record.get(0).properties.nombre);


      },
      onCompleted: function () {

        session.close();
        res.send(array);

      },
      onError: function (error) {
        console.log(error);
      }
    });

});



app.listen(port, function () {
  console.log("Example app listening on port " + 3000);
});



