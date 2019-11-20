<template>
<div id="app">
  <v-app id="inspire" style="background:grey">
  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="error"
      top center
    >
      {{ text }}
      <v-btn
        color="blue"
        text
        @click="snackbar = false"
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
    

<v-content v-if="bool_login">

<img src="../assets/logofinalsinfondo.jpg" />
<v-flex mb-4>
    <v-btn @click="X">Recomendar por mis gustos.</v-btn>
    <v-btn>Recomendar por ingredientes.</v-btn>
    <v-btn>Recomendar por valoraciones.</v-btn>
    <v-btn></v-btn>
</v-flex>
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
      snackbar: false,
      text: 'Usuario y/o contraseña incorrecta.',
      timeout: 3000,
    drawer: null,
    d_registrarse: false,
    nacimiento_registrar:1900,
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
            this.snackbar=true;

          }
          else{
             this.bool_login = true;
             this.usuario=response.body.usuario;
          }
            
          

        }, response => {
          alert(JSON.stringify(response.body));
        });
      }
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
    }
  }
}
</script>
