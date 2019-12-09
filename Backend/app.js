const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "1234"));
const session = driver.session();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//var query="MATCH (n:Persona{nacimiento:1994}) return n";

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
  console.log("1-" + user);

  console.log("2-" + password);
  var query = "MATCH (n:Persona) WHERE n.usuario='" + user + "' AND n.password='" + password + "' return n";
  // var query="MATCH (n) return n";

  const resultPromise = session.run(query);
  resultPromise.then(result => {
    session.close();
    console.log(result.records.length);
    if (result.records.length == 0) {
      res.send({ message: false })
    }
    else {
      var record = result.records[0].get(0).properties.usuario;
      res.send(record);
      console.log(record);
    }


  })
})

app.post("/usuarios", function (req, res) {
  var user = req.body.usuario;
  var nombre = req.body.nombre;
  var password = req.body.password;
  var nacimiento = req.body.nacimiento;
  console.log("1-" + user);

  console.log("2-" + password);
  var query = "CREATE (n:Persona{nombre:'" + nombre + "', nacimiento:" + nacimiento + ", usuario:'" + user + "', password:'" + password + "'})";

  // var query="MATCH (n) return n";

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
  session/**/
    .run(query)
    .subscribe({
      onNext: function (record) {
        //console.log(record.get(0).properties);
        array.push(record.get(0).properties);
      },
      onCompleted: function () {

        var pos = Math.floor(Math.random() * array.length);
        //res.send(array[pos]);
        pizza = array[pos];
        console.log("PIZZA nombre inicial" + pizza.nombre);
        query = "MATCH (p:Pizzeria)-[:OFRECE]->(n:Pizza) WHERE n.nombre='" + pizza.nombre + "' return p";
        session
          .run(query)
          .subscribe({
            onNext: function (record2) {
              console.log(record2.get(0).properties);
              array = [];
              array.push(record2.get(0).properties);
            },
            onCompleted: function () {

              session.close();
              pizza.pizzeria = array[0].nombre;
              pizza.direccion = array[0].direccion;
              pizza.telefono = array[0].telefono; console.log(pizza);
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
  //var query = " START n=node(*), m=node(*) where n.usuario = '" + user + "' and m.nombre = '" + pizza + "' create (n)-[:VALORA{valoración:" + puntuacion + "}]->(m)"
  //MATCH (n:Persona{usuario:'"+user+"'})-[v:VALORA]->(p:Pizza{nombre:'"+pizza+"'})  return v" ;
  var query = " MATCH (p:Persona)-[v:VALORA]->(e:Pizza) WHERE p.usuario = '" + user + "' AND e.nombre='" + pizza + "' AND exists(v.valoración) RETURN v.valoración"

  console.log("USER=" + user);
  console.log("PIZZAAA=" + pizza);
  var array = [];
  var session = driver.session();
  var pizza;
  var tiene = false;

  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {
        console.log(record.get(0).properties);
        console.log(record.get(0));
        console.log(record);
        if (record.length != 0) {
          console.log("TIENE");
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
          console.log("PROCESO FINALZIADO");
          res.send({ message: true })

        })


      },
      onError: function (error) {
        console.log(error);
      }
    });
});

/*var session2 = driver.session();
var array2=[];
var query2="MATCH (p:Pizzeria)-[:OFRECE]->(n:Pizza) WHERE n.nombre="+ pizza.nombre+" return p";
console.log(pizza.nombre);

// Run a Cypher statement, reading the result in a streaming manner as records arrive:
session2
  .run(query2)
  .subscribe({
    onNext: function (record2) {
      console.log(record2.get(0).properties);
      array2.push(record2.get(0).properties);
    },
    onCompleted: function () {
      session2.close();
      pizza.nombre=array[0].nombre;
      pizza.direccion=array[0].direccion;
      pizza.telefono=array[0].telefono;
      res.send(pizza);
      console.log("PIZZA FINAL:"+pizza)
    },
    onError: function (error) {
      console.log(error);
    }
  });*/

//})

app.post("/pizzeria", function (req, res) {

  var query = "MATCH (p:Pizzeria)-[:OFRECE]->(n:Pizza) WHERE n.nombre=" + req.body.pizza + " return p";
  var session = driver.session();
  var array = [];
  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {
        console.log(record.get(0).properties);
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
  console.log("USU=" + user);
  var session = driver.session();
  var query = "MATCH (n:Persona{usuario:'" + user + "'})-[v:VALORA]->(p:Pizza)<-[:OFRECE]-(e:Pizzeria) return p,v.valoración,e";
  console.log("ENTRADO");

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
        console.log(objeto);

        array.push(objeto);

        //console.log(array[0]);
        //console.log(array[0].get(0).properties);
      },
      onCompleted: function () {
        console.log(array[0] + "AAAA");
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
  console.log("USU=" + user);
  var session = driver.session();
  var query = "MATCH (n:Persona)-[v:VALORA]->(p:Pizza)<-[:OFRECE]-(e:Pizzeria) return p,v.valoración,e";
  console.log("ENTRADO");

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
        console.log(objeto);

        array.push(objeto);

        //console.log(array[0]);
        //console.log(array[0].get(0).properties);
      },
      onCompleted: function () {
        console.log(array[0] + "AAAA");
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
  console.log("USU=" + user);
  var session = driver.session();
  var query = "MATCH (n:Pizzeria)-[:OFRECE]->(p:Pizza)-[:CONTIENE]->(i:Ingrediente) WHERE i.nombre='" + ingrediente + "' return p,n";
  console.log("ENTRADO");

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
        console.log(objeto);

        array.push(objeto);

        //console.log(array[0]);
        //console.log(array[0].get(0).properties);
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
  console.log("USU=" + user);
  var session = driver.session();
  var query = "MATCH (p:Pizza)-[:CONTIENE]->(i:Ingrediente) WHERE p.nombre='" + pizza + "' return i";
  console.log("ENTRADO");

  var array = [];


  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {

        array.push(record.get(0).properties.nombre);

        console.log(array[0]);
        //console.log(array[0].get(0).properties);
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


app.post("/mio2", function (req, res) {
  var user = req.body.user;
  var objeto = req.body.objeto
  console.log("USU=" + user);
  var query = "MATCH (p:Pizzeria)-[:OFRECE]->(n:Pizza) WHERE n.nombre='" + objeto.nombre + "' return p";
  console.log("ENTRADO");
  var array = [];
  var objeto;


  // Run a Cypher statement, reading the result in a streaming manner as records arrive:
  session
    .run(query)
    .subscribe({
      onNext: function (record) {

        objeto = (record.get(0).properties);
        objeto.puntuacion = record.get(1).low;

        /*// console.log("BOI");
        var temp=[];
        var query2;
        var session2 = driver2.session();
        query2="MATCH (p:Pizzeria)-[:OFRECE]->(n:Pizza) WHERE n.nombre='"+ objeto.nombre+"' return p";
        session2
          .run(query2)
          .subscribe({
            onNext: function (record2) {
              console.log(2);
              //console.log(record2.get(0).properties);
              temp=[];
              
              temp.push(record2.get(0).properties);
             
             // console.log(temp[0]);

            },
            onCompleted: function () {            
  
              session2.close();
              objeto.pizzeria=temp[0].nombre;
              objeto.direccion=temp[0].direccion;
              objeto.telefono=temp[0].telefono;
              //console.log(1);
              //console.log(objeto);
              array.push(objeto);
              console.log(array[0]);

              
            },
            onError: function (error) {
              console.log(error);
            }
          });*/


        array.push(objeto);

        //console.log(array[0]);
        //console.log(array[0].get(0).properties);
      },
      onCompleted: function () {
        console.log(array[0] + "FFF");
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



