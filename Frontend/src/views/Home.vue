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
        color="blue"
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
        color="blue"
        text
        @click="snackbarPizza = false"
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

  <v-layout justify-center align-center><v-spacer></v-spacer><v-spacer></v-spacer>
    <v-btn @click="recomendarMio" >Mi agenda.</v-btn><v-spacer></v-spacer>
    <v-btn @click="puntuando=false, recomendandoYo=false, recomendandoResto=false, recomendandoIngre=true, aleatorio=false , array=[]">Recomendar por ingredientes.</v-btn><v-spacer></v-spacer>
    <v-btn @click="puntuando=true, recomendandoYo=false, recomendandoResto=false, recomendandoIngre=false, aleatorio=false">Puntuar Pizza</v-btn><v-spacer></v-spacer>
    <v-btn @click="pedirAleatoria">Pedir Aleatoria</v-btn><v-spacer></v-spacer>
    <v-btn @click="recomendarGente">Recomendar por valoraciones.</v-btn><v-spacer></v-spacer><v-spacer></v-spacer>

     
    
</v-layout>
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
              
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>  


    <v-content v-if="recomendandoIngre">
    

      <v-container grid-list-md text-xs-center fluid pa-12>
      <v-select
          v-model="e2"
          :items="ingredientes"
          menu-props="auto"
          label="Ingrediente preferido:"
          hide-details
        ></v-select>
        <v-btn @click="recomendarIngre">Recomendar por valoraciones.</v-btn>
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
              <v-btn  @click= "pedirIngredientes(item)" > Mas Info </v-btn>
     
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
                  <li v-for="ing in arrayIngredientes" v-bind:key=ing>
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
      
        <v-col cols="3" sm="5" >
          <v-select
          v-model="e1"
          :items="pizzas"
          menu-props="auto"
          label="Nombre de la Pizza:"
          hide-details
        ></v-select>

        </v-col> <v-col cols="2" sm="3">
          <v-text-field  v-model="puntuacion" type=number label="Puntuación(1-10)" min="0" max="10" >
                      </v-text-field>
        </v-col>
        <v-col cols="2" sm="3">
          <v-btn @click="puntuar" right>Puntuar</v-btn>
        </v-col>
        
        
        
        
        
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
   e1:'Pizza Rock',
   array:[],
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
            src: 'https://www.reasonwhy.es/sites/default/files/dominos-pizza.jpg',
          },
          {
            position:"bottom",
            src: 'https://odd-prod.gfrcdn.net/ODD/images//e19ed78d-8bc7-4a5a-94e4-13dfea33f46a/7ad2e9aa.jpg',
          },
          {
            position:"bottom",
            src: 'https://ladarsenacm.com/wp-content/uploads/2018/05/anunciate-aqui-2.jpg',
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
      text: 'Usuario y/o contraseña incorrecta.',
      textPizza:'Su puntuación se ha realizado correctamente',
      timeout: 3000,
      puntuando: false,
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
    currentTab: 'Personajes',
    tabs: ['Personajes', 'Partidas', 'Mapas'],
    listaPersonajes: [],
    listaPartidas: [],
    listaMapas: [],
    expand: false,
    bool_login: false,
    show1: false, // Visibilidad contraseña login
    show2: false, // Visibilidad contraseña registrar
    list: {
      0: false,
      1: false,
      2: false
    },
    /* Reglas aplicadas a los campos de usuario y contraseña para entrar en la aplicacion */
    rules: {
      required: value => !!value || 'Requerido.',
      min: v => v.length >= 8 || 'Mínimo 8 caracteres',
      minUser: v => v.length >= 6 || 'Mínimo 6 caracteres',
    },
    tooltip: false,
  }),
  computed: {
    currentTabComponent: function () {
      return 'tab-' + this.currentTab.toLowerCase()
    }
  },
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
    },

    /**
     * Permite al usuario loguearse en la aplicacion:
     * 
     *  - Comprueba que ese usuario exista en la base de datos
     *  - Si existe en la base de datos, muestra los datos guardados en la base de datos de ese usuario
     */
    login() {

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
        
        var data={user:this.user,pizza:this.e1,puntuacion:this.puntuacion};
        this.recomendandoYo=false;
        this.recomendandoResto=false;
        this.recomendandoIngre=false;
        this.aleatorio=false;
        
    
        this.$http.post('http://localhost:3000/puntuar', data).then(response => {

          if(response.body.message==true){
            this.snackbarPizza=true;


          }

            
          

        }, response => {
          alert(JSON.stringify(response.body));
        });
      
    },
   /* pedirPizzeria() {
        
        //var data={user:this.user,password:this.password};
        this.pizzerias=[];
        var data={pizza:this.array[0].nombre};        
    
        this.$http.post('http://localhost:3000/pizzeria', data).then(response => {
          this.array[0].Pizzeria=response.body.nombre;
          this.array[0].Direccion=response.body.direccion;
          this.array[0].Telefono=response.body.telefono;


         
          

        }, response => {
          alert(JSON.stringify(response.body));
        });
      
    },*/

    pedirAleatoria() {

        //var data={user:this.user,password:this.password};
        this.array=[];
        var data={user:this.user,password:this.password};
        this.recomendandoYo=false;
        this.recomendandoResto=false;
        this.recomendandoIngre=false;
        this.puntuando=false;
        this.aleatorio= true;
        
    
        this.$http.post('http://localhost:3000/aleatoria', data).then(response => {
          this.array.push(response.body);            
          

        }, response => {
          alert(JSON.stringify(response.body));
        });
      
    },


    recomendarMio(){
        
        this.array=[];
        var data={user:this.user};
        this.recomendandoYo=true;
        this.recomendandoResto=false;
        this.recomendandoIngre=false;
        this.puntuando=false;
        this.aleatorio= false;
        
    
        this.$http.post('http://localhost:3000/mio', data).then(response => {
          this.array=response.body;            

        }, response => {
          alert(JSON.stringify(response.body));
        });
    },

    recomendarIngre(){
        
        this.array=[];
        var data={user:this.user, ingrediente: this.e2, alergia: this.alergia};
        this.recomendandoYo=false;
        this.recomendandoResto=false;
        this.recomendandoIngre=true;
        this.puntuando=false;
        this.aleatorio= false;
        
    
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

      this.listaPersonajes = [];
      this.listaMapas = [];
      this.listaPartidas = [];

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
