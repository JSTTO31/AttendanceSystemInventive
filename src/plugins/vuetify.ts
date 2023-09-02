/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const currentTheme = localStorage.getItem('currentTheme') || 'light'

export default createVuetify({
  theme: {
    defaultTheme: currentTheme,
    themes: {
      light: {
        colors: {
          primary: '#615dec',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
