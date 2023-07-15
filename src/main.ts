import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { useUserStore } from './stores/user'
import { useAppStore } from './stores/app'

const app = createApp({...App, mounted(){
  const userData = localStorage.getItem('userData')
  if(userData){
    const $app = useAppStore()
    const $user = useUserStore()
    $user.setUser()
    $app.getCurrentOJT()
  }

}})

registerPlugins(app)

app.mount('#app')




