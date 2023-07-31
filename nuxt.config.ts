// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from 'path'
export default defineNuxtConfig({
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify'],
  },
  alias:{
    "@": resolve(__dirname, "/")
 },
 modules: [
  [
    '@pinia/nuxt',
    {
      autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
  ],
],
 imports: {
  dirs: ['stores'],
},
app:{
  pageTransition:{name: "page", mode:"out-in"}
},



})
