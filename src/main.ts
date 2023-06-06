/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { useUserStore } from './stores/user'

const app = createApp({...App, mounted(){
  const userData = localStorage.getItem('userData')
  if(userData){
    const $user = useUserStore()
    $user.setUser()
  }
}})

registerPlugins(app)

app.mount('#app')
