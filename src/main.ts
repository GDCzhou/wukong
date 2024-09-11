import './assets/main.scss'

import App from './App.vue'
import { setupMock } from '@/mocks'

setupMock()
const store = createPinia()


createApp(App).use(store).mount('#app')
