<template>
<div id="app">
  <v-app id="inspire" style="background:red lighten-4">
  <v-snackbar
      v-model="snackbarUsuario"
      :timeout="timeout"
      color="error"
      top center
    >
      {{ text }}
      <v-btn
        color="black"
        text
        @click="snackbarUsuario = false"
      >
        Close
      </v-btn>
    </v-snackbar>
      <v-snackbar
      v-model="snackbarPizza"
      :timeout="timeout"
      color="success"
      top center
    >
      {{ textPizza }}
      <v-btn
        color="black"
        text
        @click="snackbarPizza = false"
      >
        Close
      </v-btn>
    </v-snackbar>

      <v-snackbar
      v-model="snackbarPuntuar"
      :timeout="timeout"
      color="error"
      top center
    >
      {{ textPuntuar }}
      <v-btn
        color="black"
        text
        @click="snackbarPuntuar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-app-bar
      app
      color="black"
      
      dark
    >

    <v-spacer></v-spacer>
        <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
       

          <!-- Campo donde se escribe el usuario, y que permite entrar a la aplicacion -->
            
            <v-text-field v-if="!bool_login" prepend-icon="mdi-account" name="login" label="Usuario" type="text" min="6"
              v-model="user" v-on:keyup.enter="login"></v-text-field>
          
        <v-spacer></v-spacer>
          <!-- Campo donde se escribe la contraseña, y que permite entrar a la aplicacion -->
          
            <v-text-field v-if="!bool_login" v-model="password" prepend-icon="mdi-lock" name="password" label="Contraseña"
              id="password" min="8" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'" v-on:keyup.enter="login" @click:append="show1 = !show1">
            </v-text-field>
            <v-text-field v-if="bool_login" v-model="user" readonly></v-text-field>
          
<v-spacer></v-spacer>
          <!-- Boton que permite Iniciar Sesion -->
          <v-btn v-if="!bool_login" @click="login" color="#636363" >Iniciar Sesión</v-btn>
<v-spacer></v-spacer>
          <!-- Boton que abre la ventana para Registrarse -->
          <v-btn v-if="!bool_login" @click="d_registrarse = true" color="#636363" dark >Registrarse</v-btn>

          <!-- Ventana que permite registrarse -->
          <v-dialog v-model="d_registrarse" max-width="550px" persistent>
            <v-card>
              <v-card-title>
                <span class="headline">Usuario nuevo</span>
              </v-card-title>

              <v-card-text>

                <v-divider></v-divider>

                <br>
                <h3>Requisitos para registrarse:</h3>
                <br>

                <ul>
                  <li>El Nombre de Usuario debe tener como mínimo 6 caracteres</li>
                  <li>La Contraseña debe contenter como mínimo 8 caracteres</li>
                </ul>
                <br>

                <v-divider></v-divider>

                <v-container grid-list-md>
                  <v-layout wrap>

                    <!-- Campo donde se escribe el usuario, y que permite registrarlo en la base de datos -->
                    <v-flex xs12 sm6 md6>
                      <v-text-field prepend-icon="mdi-account-circle" v-model="nombre_registrar" label="Usuario" type="text" min="6"
                        :rules="[rules.required, rules.minUser]" v-on:keyup.enter="registrar">
                      </v-text-field>
                    </v-flex>

                    <!-- Campo donde se escribe la contraseña, y que permite registrarlo en la base de datos -->
                    <v-flex xs12 sm6 md6>
                      <v-text-field prepend-icon="mdi-lock" v-model="pass_registrar" label="Contraseña" min="8"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                        :type="show2 ? 'text' : 'password'" v-on:keyup.enter="registrar" @click:append="show2 = !show2">
                      </v-text-field>
                    </v-flex>
                      <v-flex xs12 sm6 md6>
                      <v-text-field prepend-icon="mdi-account" v-model="nombrecompleto_registrar" label="Nombre Completo" type="text" min="1"
                        v-on:keyup.enter="registrar">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field prepend-icon="mdi-calendar" v-model="nacimiento_registrar" type=number label="Año Nacimiento" 
                         v-on:keyup.enter="registrar">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <!-- Boton que Cancela el Registro -->
                <v-btn color="blue darken-1" flat @click="cerrar_registrar">Cancelar</v-btn>

                <!-- Boton que guarda al usuario en la base de datos, y le da acceso a la aplicacion -->
                <v-btn color="blue darken-1" flat @click="registrar">Crear</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Boton que Cierra Sesion, solo cuando se esta dentro de la aplicacion -->
          <v-tooltip v-if="bool_login" v-model="tooltip" bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon c @click="cerrar_sesion" dark  v-on="on">
                <v-icon>mdi-export</v-icon>
              </v-btn>
            </template>
            <span>Cerrar Sesión</span>
          </v-tooltip>

      
    <!-- <img class="mr-3" src="pizzagraph/src/views/logofinalsinfondo.jpg" height="70" width="70"/>-->
    </v-app-bar>
    
    <v-content v-if="!(bool_login)">

    <v-carousel 
      
      height="900"
      width="300"
      :show-arrows="false"
      :hide-delimiters="true"
      :cycle="true"
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
  
      </v-carousel-item>
    </v-carousel>
 
</v-content >
 

<v-content v-if="bool_login" >
<v-layout justify-center align-center><img src="../assets/logofinalsinfondo.png" height="220px"  position="center"/></v-layout>

  <v-layout justify-center align-center>

  <v-card height="100px" width="1110px" ><v-spacer></v-spacer>
  <v-toolbar color="#F5AC18" height="100px" width="1110px" >
    <v-btn @click="recomendarMio" color= "#F7C662">Mi agenda</v-btn><v-spacer></v-spacer>
    <v-btn color= "#F7C662" @click="puntuando=false, recomendandoYo=false, recomendandoResto=false, recomendandoIngre=true, aleatorio=false ,recomendandoGente=false, array=[]">Recomendar por ingredientes</v-btn><v-spacer></v-spacer>
    <v-btn color= "#F7C662" @click="puntuando=true, recomendandoYo=false, recomendandoResto=false, recomendandoIngre=false, recomendandoGente=false, aleatorio=false">Puntuar Pizza</v-btn><v-spacer></v-spacer>
    <v-btn color= "#F7C662" @click="pedirAleatoria">Pedir Aleatoria</v-btn><v-spacer></v-spacer>
    <v-btn color= "#F7C662" @click="recomendarGente">Recomendar por valoraciones</v-btn><v-spacer></v-spacer><v-spacer></v-spacer>
  </v-toolbar> </v-card>
  </v-layout>
 
     <v-content v-if="recomendandoIngre">
    

      <v-container grid-list-md text-xs-center fluid pa-12 align-center justify-center>
       <v-layout wrap text-center align-center justify-center>
       <v-card height="100px" width="750px" color="#F79C4F">
      
      <v-toolbar height="100px" width="750px" color="#F79C4F">
      <v-toolbar-title>
        <v-select
        
        outlined
          v-model="e2"
          :items="ingredientes"
          menu-props="auto"
          label="Ingrediente preferido:"
          hide-details
        ></v-select>
        </v-toolbar-title><v-spacer></v-spacer>
        <v-toolbar-title>
          <v-btn color="#F7C662" @click="recomendarIngre">Buscar por ingrediente</v-btn>
        </v-toolbar-title>
        </v-toolbar>
        </v-card>
        </v-layout>
         </v-container>
        <v-container grid-list-md text-xs-center fluid pa-12 >
        <v-layout row wrap fill-height fill-width>
          <v-flex v-for="(item, index) in array" v-bind:key="index">
            <v-card
              @click.native="pedirIngredientes(item)"
              elevation="18"
              dark
              style="background: #3A1C71;
    background: -webkit-linear-gradient(to right, #F94242, #F94242, #F94242);
    background: linear-gradient(to right,  #F94242, #F94242, #F94242);"
            >
              <v-card-title>{{item.nombre}}</v-card-title>
              <v-card-subtitle>
                Pizzería: {{item.pizzeria}}
                 <br />
                Dirección: {{item.direccion}}
                <br />
                Telefono: {{item.telefono}}
                <br />
              </v-card-subtitle>
              <v-card-actions>
              <v-btn  color="#F79C4F" depressed @click= "pedirIngredientes(item)" > Mas Info </v-btn>
     
    </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>  
    

<v-content v-if="aleatorio">
      <v-container grid-list-md text-xs-center fluid pa-12>
        <v-layout row wrap fill-height fill-width>
          <v-flex v-for="(item, index) in array" v-bind:key="index">
            <v-card
              elevation="18"
              dark
              style="background: #3A1C71;
    background: -webkit-linear-gradient(to right, #F94242, #F94242, #F94242);
    background: linear-gradient(to right,  #F94242, #F94242, #F94242);"
            >
              <v-card-title>{{item.nombre}}</v-card-title>
              <v-card-subtitle>
                Pizzería: {{item.pizzeria}}
                 <br />
                Dirección: {{item.direccion}}
                <br />
                Telefono: {{item.telefono}}
                <br />
              </v-card-subtitle>
            <v-card-actions>
              <v-btn  color="#F79C4F" @click= "pedirIngredientes(item)" > Mas Info </v-btn>
     
            </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>  


    <v-content v-if="recomendandoYo">
      <v-container grid-list-md text-xs-center fluid pa-12>
        <v-layout row wrap fill-height fill-width>
          <v-flex v-for="(item, index) in array" v-bind:key="index">
            <v-card
              elevation="18"
              dark
              style="background: #3A1C71;
    background: -webkit-linear-gradient(to right, #F94242, #F94242, #F94242);
    background: linear-gradient(to right,  #F94242, #F94242, #F94242);"
            >
              <v-card-title>{{item.nombre}}</v-card-title>
              <v-card-subtitle>
                Pizzería: {{item.pizzeria}}
                 <br />
                Dirección: {{item.direccion}}
                <br />
                Telefono: {{item.telefono}}
                <br />
                Puntuación: {{item.puntuacion}}
                <br />
              </v-card-subtitle>
              <v-card-actions>
              <v-btn  color="#F79C4F" @click= "pedirIngredientes(item)" > Mas Info </v-btn>
     
            </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>  

    <v-content v-if="recomendandoGente">
      <v-container grid-list-md text-xs-center fluid pa-12>
        <v-layout row wrap fill-height fill-width>
          <v-flex v-for="(item, index) in definitivo" v-bind:key="index">
            <v-card
              elevation="18"
              dark
              style="background: #3A1C71;
    background: -webkit-linear-gradient(to right, #F94242, #F94242, #F94242);
    background: linear-gradient(to right,  #F94242, #F94242, #F94242);"
            >
              <v-card-title>{{item.nombre}}</v-card-title>
              <v-card-subtitle>
                Pizzería: {{item.pizzeria}}
                 <br />
                Dirección: {{item.direccion}}
                <br />
                Telefono: {{item.telefono}}
                <br />
                Puntuación: {{item.puntuacion}}
                <br />
              </v-card-subtitle>
              <v-card-actions>
              <v-btn  color="#F79C4F" @click= "pedirIngredientes(item)" > Mas Info </v-btn>
     
            </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>  


    
          <v-dialog v-model="d_ingredientes" max-width="550px" persistent>
            <v-card>
              <v-card-title>
                <span class="headline">Ingredientes:</span>
              </v-card-title>

              <v-card-text>

                <v-divider></v-divider>

                <br>
                <h3>Ingredientes utilizados:</h3>
                <br>
                  <li v-for="ing in arrayIngredientes" v-bind:key="ing">
                      {{ ing }}
                    </li>
                <br>

                <v-divider></v-divider>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <!-- Boton que Cancela el Registro -->
                <v-btn color="blue darken-1" flat @click="d_ingredientes=false">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

<v-content v-if="puntuando" justify-center align-center>
      <v-container grid-list-md text-xs-center fluid pa-12 align-center justify-center>
       <v-layout wrap text-center align-center justify-center>
       <v-card height="100px" width="750px" color="#F79C4F">
      
      <v-toolbar height="100px" width="750px" color="#F79C4F">
      <v-toolbar-title>
        <v-select
        outlined
          v-model="e1"
          :items="pizzas"
          menu-props="auto"
          label="Nombre de la Pizza:"
          hide-details
        ></v-select>
        </v-toolbar-title><v-spacer></v-spacer>
        <v-toolbar-title>
         <v-text-field   v-model="puntuacion" type=number label="Puntuación(1-10)" min="0" max="10" ></v-text-field>
        </v-toolbar-title><v-spacer></v-spacer>
        <v-toolbar-title>
         <v-btn color="#F7C662" @click="puntuar" right>Puntuar</v-btn>
        </v-toolbar-title>
        </v-toolbar>
        </v-card>
        </v-layout>
         </v-container>
      
    </v-content>
    <v-content v-if="recomendandoResto" justify-center align-center>
      <v-container grid-list-md text-xs-center fluid pa-12 align-center justify-center>
       <v-layout wrap text-center align-center justify-center>
       <v-card height="100px" width="575px" color="#F79C4F">
      
      <v-toolbar height="100px" width="575px" color="#F79C4F" class="font-weight-black">
      Ordenar de:<v-spacer></v-spacer>
      <v-toolbar-title>
        <v-btn color="#F7C662" @click="ordenarArray(1)" >Mayor-Menor</v-btn>
        </v-toolbar-title><v-spacer></v-spacer>
        <v-toolbar-title>
         <v-btn color="#F7C662" @click="ordenarArray(2)" >Menor-Mayor </v-btn>
        </v-toolbar-title>
        </v-toolbar>
        </v-card>
        </v-layout>
         </v-container>
      
    </v-content>


</v-content>
    <v-footer
      color="black"
      app
    >
      <span class="white--text">&copy; 2019 PIZZAGRAPH S.L</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
 data: () => ({
   array:[],
   definitivo:[],
   arrayIngredientes:[],
   element:{},
   pizzerias:[],
   ingredientes:['Queso Parmesano','Queso Cheddar','Queso Azul','Queso Cabra','Piña','Jamón York','Jamón Serrano','Jamón Cocido','Jamón Dulce',
   'Jamón Asado','Aceitunas','Pollo','Champiñones','Cebolla','Beicon','Salchicha','Espinacas','Atún','Pimientos','Rúcula','Cecina',
   'Chorizo','Guindilllas','Orégano','Anchoas','Jalapeños','Huevo','Ajo','Salsa Barbacoa','Berenjena','Calabacín','Maíz','Alcachofa'],
   items: [
          {
            position:"botttom",
            src: 'https://cdn.dominospizza.es/empresa/Come_y_Bebe/dominos-iframe-ES/img/DESKTOP_ComeBebe_CAST.jpg',
          },
          {
            position:"bottom",
            src: 'https://roelpizza.com/templates/yootheme/cache/pizzeria-sant-cugat-a-domicilio-ae934bee.jpeg',
          },
          {
            position:"bottom",
            src: 'https://1.bp.blogspot.com/-xtIbsJiLQuY/WoloDM2d6hI/AAAAAAABbeU/W0sOPK5kAvwN7bFBxIjX77iVb0MDkETQQCK4BGAYYCw/s1600/anunciate.gif',
          },
      ],
      ingrediente:"", 
      d_ingredientes:false,
      alergia: false,
      pizzas:['Pizza Rock','Pizza Pazza','Carabi',
      'Dolores','Hermelinda','Leónida','Leonesa','Funghi',
      'Estativa','Barbacoa','Napoli','Romana','Tartufata','Al tonno',
      'Peperoni Hot','Diavola','Calzone','Ananas','Napolitana','Popeye',
      'Paisana','Hawaiana','Cremozza','Oklahoma Bacon Crispy','Pata Negra','Carabi',
      'Campiña Pan','Gárgolas','Románica','Vidrieras','Carabi','Rigoletto',
      'Nostra','Capri'],
      snackbarUsuario: false,
      snackbarPizza:false,
      snackbarPuntuar:false,
      text: 'Usuario y/o contraseña incorrecta.',
      textPizza:'Su puntuación se ha realizado correctamente',
      textPuntuar:"Puntuación= (min 0 - max 10) y debe escoger una pizza",
      timeout: 3000,
      puntuando: false,
      segundaFase:false,
      ordenadoArray:false,
      recomendandoYo:false,
      recomendandoResto:false,
      aleatorio:false,
      recomendandoIngre:false,
    drawer: null,
    d_registrarse: false,
    nacimiento_registrar:1900,
    puntuacion:0,
    nombrecompleto_registrar:"",
    nombre_registrar:"",
    pass_registrar: "",
    user: "",
    password: "",
    bool_login: false,
    show1: false, // Visibilidad contraseña login
    show2: false, // Visibilidad contraseña registrar
    
    /* Reglas aplicadas a los campos de usuario y contraseña para entrar en la aplicacion */
    rules: {
      required: value => !!value || 'Requerido.',
      min: v => v.length >= 8 || 'Mínimo 8 caracteres',
      minUser: v => v.length >= 6 || 'Mínimo 6 caracteres',
    },
    tooltip: false,
  }),

methods: {

    /**
     * Funcion que permite al usuario registrarse en la aplicacion:
     * 
     *  - Comprueba que el usuario no existe en la base de datos
     *  - Le introduce en la aplicacion
     */
    registrar() {

      var form = new Object();
      form.nombre=this.nombrecompleto_registrar;
      form.usuario = this.nombre_registrar;
      form.password = this.pass_registrar;
      form.nacimiento=this.nacimiento_registrar;

      this.$http.post('http://localhost:3000/usuarios', form).then(() => {

        this.user = this.nombre_registrar;
        this.password = this.pass_registrar;
        this.bool_login = true;
        var color= document.getElementById("inspire");
        color.style.backgroundColor="#FFF3E0";
        this.cerrar_registrar();

      }, response => {
        alert(response.body);
      });
    },

    /**
     * Funcion que cierra y reinicia el dialog de registrarse:
     * 
     *  - Reinicia los campos de escritura y deja el campo de contraseña en invisible
     *  - Cierra el dialog
     */
    cerrar_registrar() {

      this.nombre_registrar = "";
      this.pass_registrar = "";
      this.d_registrarse = false;
      this.show2 = false;
      this.array=[];
    },

    /**
     * Permite al usuario loguearse en la aplicacion:
     * 
     *  - Comprueba que ese usuario exista en la base de datos
     *  - Si existe en la base de datos, muestra los datos guardados en la base de datos de ese usuario
     */
    login() {
      
        this.array=[];
        this.recomendandoYo=false;
        this.recomendandoResto=false;
        this.recomendandoIngre=false;
        this.puntuando=false;
        this.aleatorio= false;
        this.recomendandoGente=false;
        this.ordenadoArray=false;
      if (this.user !== null && this.password !== null) {
        var data={user:this.user,password:this.password};

        this.$http.post('http://localhost:3000/login', data).then(response => {

          if(response.body.message==false){
            this.snackbarUsuario=true;

          }
          else{
             this.bool_login = true;
             this.usuario=response.body.usuario;
             var color= document.getElementById("inspire");
             color.style.backgroundColor="#FFF3E0";
          }
            
          

        }, response => {
          alert(JSON.stringify(response.body));
        });
      }
    },

    puntuar() {
        
        this.array=[];
        
        this.recomendandoYo=false;
        this.recomendandoResto=false;
        this.recomendandoIngre=false;
        this.aleatorio=false;
        this.ordenadoArray=false;
        this.recomendandoGente=false;
        var pas=true;
        var cadena=this.puntuacion.toString();
        var i=0;

        for(i=0;i<cadena.length;i++){
          if(cadena.charAt(i)=='.' || cadena.charAt(i)==','){
            pas=false;
            i=cadena.length
          }
        }
        
    if(this.puntuacion<=10 && this.puntuacion>=0 && this.e1!=undefined && pas==true){
     
      var data={user:this.user,pizza:this.e1,puntuacion:this.puntuacion};
        this.$http.post('http://localhost:3000/puntuar', data).then(response => {
            if(response.body.message==true){
                this.snackbarPizza=true;
            }

         }, response => {
            alert(JSON.stringify(response.body));
         });
    }else{
        this.snackbarPuntuar=true;
    }
        
      
    },
    ordenarArray(par){
             
     //   var par=1;
                 var i=0;
                 //alert(this.array[0].puntuacion);
          var j=0;
        
          var aux;
    
          var q={};
          this.definitivo=[];
          var pun=0.0;
          var veces=0;
          for( i=0;i<this.array.length;i++){
           if(JSON.stringify(q)=='{}'){
             //alert(this.array[i].puntuacion);
            
             q=this.array[i];
             pun=this.array[i].puntuacion;
             veces+=1; //alert("BANZAI000000:"+i+" "+this.array[i].nombre+" PPPPP:"+pun);
           }
           else{
             //alert("BANZAI222222:"+i+" "+this.array[i].nombre+" PPPPP:"+pun);
              if(q.nombre==this.array[i].nombre){
                pun+=this.array[i].puntuacion;
                veces+=1;
               
              // alert("BANZAI1111111111:"+i+" "+this.array[i].nombre+" PPPPP:"+pun);
              }          
              else{
                q.puntuacion=(pun/veces);
                this.definitivo.push(q);
                pun=0.0;
                veces=0;
                q={};//alert("BANZAI:"+this.definitivo[i].nombre+" PPPPP:"+this.definitivo[i].puntuacion);
                      
              }       
           }                 
          }//alert(this.definitivo[0].puntuacion);
        if(par==1){
 
          for( i=0;i<this.definitivo.length;i++){
            for(j=0;j<(this.definitivo.length-1);j++){
                if(this.definitivo[j].puntuacion<this.definitivo[j+1].puntuacion){
                  aux=this.definitivo[j];
                  this.definitivo[j]=this.definitivo[j+1];
                  this.definitivo[j+1]=aux;
                }           
            }
          }
        }
        else{
          
            for (i=0; i<this.definitivo.length;i++) {
               for (j=0;j<(this.definitivo.length-1); j++) {
                if(this.definitivo[j].puntuacion > this.definitivo[j+1].puntuacion){
                    aux= this.definitivo[j];
                   this.definitivo[j] = this.definitivo[j+1];
                   this.definitivo[j+1] = aux;
                }
              }
            }
            
        }

        this.recomendandoYo=false;
        this.recomendandoIngre=false;
        this.aleatorio=false;
        this.ordenadoArray=false;
        this.recomendandoGente=true;
        this.recomendandoResto=false;
    },
        recomendarGente() {
        this.array=[];
        var data={user:this.user};
        this.recomendandoYo=false;
        this.recomendandoIngre=false;
        this.aleatorio=false;
        this.puntuando=false;
        this.recomendandoResto=true;
        this.ordenadoArray=false;
        this.recomendandoGente=false;
        
    
        this.$http.post('http://localhost:3000/gente', data).then(response => {

          this.array=response.body;

        }, response => {
          alert(JSON.stringify(response.body));
        });
    },

    pedirAleatoria() {

        //var data={user:this.user,password:this.password};
        this.array=[];
        var data={user:this.user,password:this.password};
        this.recomendandoYo=false;
        this.recomendandoResto=false;
        this.recomendandoIngre=false;
        this.puntuando=false;
        this.recomendandoGente=false;
        this.aleatorio= true;
        this.ordenadoArray=false;
        
        
    
        this.$http.post('http://localhost:3000/aleatoria', data).then(response => {
          this.array.push(response.body);            
          

        }, response => {
          alert(JSON.stringify(response.body));
        });
      
    },


    recomendarMio(){
        this.recomendandoGente=false;
        this.array=[];
        var data={user:this.user};
        this.recomendandoYo=true;
        this.recomendandoResto=false;
        this.recomendandoIngre=false;
        this.puntuando=false;
        this.aleatorio= false;
        this.ordenadoArray=false;
        
    
        this.$http.post('http://localhost:3000/mio', data).then(response => {
          this.array=response.body;            

        }, response => {
          alert(JSON.stringify(response.body));
        });
    },

    recomendarIngre(){
        
        this.array=[];
        this.recomendandoYo=false;
        this.recomendandoIngre=true;
        this.puntuando=false;
        this.aleatorio= false;
        this.recomendandoGente=false; 
        this.ordenadoArray=false;

        var data={user:this.user, ingrediente: this.e2, alergia: this.alergia};
        
        this.recomendandoResto=false;
        
        
        
       
        
    
        this.$http.post('http://localhost:3000/ingrediente', data).then(response => {
          this.array=response.body;            

        }, response => {
          alert(JSON.stringify(response.body));
        });
    },
        pedirIngredientes(ite){
        
        var data={user:this.user, pizza: ite.nombre};     
        this.arrayIngredientes=[];   
        this.d_ingredientes=true;
    
        this.$http.post('http://localhost:3000/item', data).then(response => {
          this.arrayIngredientes=response.body;            

        }, response => {
          alert(JSON.stringify(response.body));
        });
    },

    /**
     * Accion que cierra sesion de la aplicacion:
     * 
     *  - Reinicia todos los valores a 0 y false
     *  - Muestra de nuevo el inicio de la aplicacion, perimitiendo volver a loguearse, o registrase
     */
    cerrar_sesion() {

      this.bool_login = false;
      this.e1=undefined;
      this.puntuacion=undefined;
      this.array = [];
      this.user = "";
      this.password = "";

      this.tooltip = false;
      this.show1 = false;
      var color= document.getElementById("inspire");
      color.style.backgroundColor="grey";
    }
  }
}
</script>
