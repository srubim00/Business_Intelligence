const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver("bolt://localhost",neo4j.auth.basic("neo4j", "1234")
);
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

  app.post("/login", function(req,res){
      var user=req.body.user;
      var password=req.body.password;
      console.log("1-"+user);

      console.log("2-"+password);
      var query="MATCH (n:Persona) WHERE n.usuario='"+user+"' AND n.password='"+password+"' return n";
     // var query="MATCH (n) return n";

    const resultPromise = session.run(query);
    resultPromise.then(result=>{
      session.close();
      console.log(result.records.length);
      if(result.records.length==0){
        res.send({message:false})
      }
      else{
         var record=result.records[0].get(0).properties.usuario;
         res.send(record);
         console.log(record);
      }
    
      
    })
  })

  app.post("/usuarios", function(req,res){
    var user=req.body.usuario;
    var nombre=req.body.nombre;
    var password=req.body.password;
    var nacimiento=req.body.nacimiento;
    console.log("1-"+user);

    console.log("2-"+password);
    var query="CREATE (n:Persona{nombre:'"+nombre+"', nacimiento:"+nacimiento+", usuario:'"+user+"', password:'"+password+"'})";
    
   // var query="MATCH (n) return n";

  const resultPromise = session.run(query);
  resultPromise.then(result=>{
    session.close();
    res.send({message:true})
    
  })
})

app.listen(port, function() {
  console.log("Example app listening on port " + 3000);
});