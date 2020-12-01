
export default {
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "แห่เทียนเข้าพรรษา",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      //base
      { rel: 'stylesheet', href: '/base/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/base/css/pogo-slider.min.css' },
      { rel: 'stylesheet', href: '/base/css/style.css' },
      { rel: 'stylesheet', href: '/base/css/responsive.css' },
      { rel: 'stylesheet', href: '/base/css/custom.css' },
      //admin
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/plugins/fontawesome-free/css/all.min.css' },
      // { rel: 'stylesheet', href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' },
      // { rel: 'stylesheet', href: '/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css' },
      // { rel: 'stylesheet', href: '/plugins/icheck-bootstrap/icheck-bootstrap.min.css' },
      // { rel: 'stylesheet', href: '/plugins/jqvmap/jqvmap.min.css' },
      { rel: 'stylesheet', href: '/dist/css/adminlte.min.css' },
      //{ rel: 'stylesheet', href: '/plugins/overlayScrollbars/css/OverlayScrollbars.min.css' },
      // { rel: 'stylesheet', href: '/plugins/daterangepicker/daterangepicker.css' },
      { rel: 'stylesheet', href: '/plugins/summernote/summernote-bs4.css' },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700' },
      { rel: 'stylesheet', href: '/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css'},
      { rel: 'stylesheet', href: '/plugins/toastr/toastr.min.css'},
      { rel: 'stylesheet', href: '/plugins/select2/css/select2.min.css'},
      { rel: 'stylesheet', href: '/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css'}, 

    ],
    script: [
      //base
      { src: '/base/js/jquery.min.js' },
      { src: '/base/js/popper.min.js' },
      { src: '/base/js/bootstrap.min.js' },
      // { src: '/base/js/jquery.magnific-popup.min.js' },
      { src: '/base/js/jquery.pogo-slider.min.js' },
      { src: '/base/js/slider-index.js' },
      //{ src: '/base/js/smoothscroll.js' },
      { src: '/base/js/form-validator.min.js' },
      // { src: '/base/js/contact-form-script.js' },
      // { src: '/base/js/isotope.min.js' },
      // { src: '/base/js/images-loded.min.js' },
      { src: '/base/js/custom.js' },
      //{ src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4UH9t_QJ7nVypuKbNqbx25ffRSD-pvTA' },
      
      //admin
     // { src: '/plugins/jquery/jquery.min.js', body: true },
      //{ src: '/plugins/jquery-ui/jquery-ui.min.js', body: true },
      // { src: '/plugins/bootstrap/js/bootstrap.bundle.min.js', body: true },
      // { src: '/plugins/chart.js/Chart.min.js', body: true },
      // { src: '/plugins/sparklines/sparkline.js', body: true },
      // { src: '/plugins/jqvmap/jquery.vmap.min.js', body: true },
      // { src: '/plugins/jqvmap/maps/jquery.vmap.usa.js', body: true },
      // { src: '/plugins/jquery-knob/jquery.knob.min.js', body: true },
      // { src: '/plugins/moment/moment.min.js', body: true },
      // { src: '/plugins/daterangepicker/daterangepicker.js', body: true },
      // { src: '/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js', body: true },
      { src: '/plugins/summernote/summernote-bs4.min.js', body: true },
      { src: '/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js', body: true },
      { src: '/dist/js/adminlte.js', body: true },
      { src: '/plugins/datatables/jquery.dataTables.min.js', body: true },
      { src: '/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js', body: true },
      { src: '/plugins/jquery-validation/jquery.validate.min.js', body: true },
      { src: '/plugins/toastr/toastr.min.js', body: true },
      { src: '/plugins/select2/js/select2.full.min.js', body: true },
    
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-lazyload',
    '~/plugins/lazysizes.client.js',
    '~/plugins/vue2-google-maps.js' 
    //'~/plugins/google-maps.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //'@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['@nuxtjs/pwa', { meta: false, icon: false, manifest: false }],
    ['nuxt-responsive-loader'],
    // ['nuxt-gmaps', { 
    //   key: 'AIzaSyB4UH9t_QJ7nVypuKbNqbx25ffRSD-pvTA',
    //   libraries: ['places,directions']
    // }]
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'data.token' },
          user: { url: 'me', method: 'get', propertyName: 'data.user' },
          logout: false
        }
      }
    },
    redirect: {
      login: '/login'
    }
  },
  router: {
    //middleware: ['auth']
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://service.candlesfest.com/api/authen'
  },
  responsiveLoader: {
    adapter: require('responsive-loader/sharp'),
    name: 'images/[name]-[width].[ext]', // use [name] to keep the original filename
    sizes: [320, 640, 768, 960, 1024, 1280, 1600, 1920], // array of image sizes - adjust to your layout needs
    quality: 85 // 85 is default. Tweak this if you need to
  },
  /*
  ** Build configuration
  */
  build: {

   transpile: [/^vue2-google-maps($|\/)/],
   extend (config, { isDev, isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }
    }
    ,
    vendor: ['vue2-google-maps']
  }
}
