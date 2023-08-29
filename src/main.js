import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/styles/app.css'
import '@purge-icons/generated'
import '@vueform/multiselect/themes/default.css'
import CustomDataTable from './components/CustomDataTable.vue';
import store from './store'
import Toaster from '@meforma/vue-toaster'
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import VueHtmlToPaper from './utils/vue-html-to-paper'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import JsonCSV from 'vue-json-csv'
import 'tw-elements';
import 'pusher-js'
import Multiselect from '@vueform/multiselect'

const app = createApp(App)

app.component('date-picker', Datepicker);
app.component('downloadCsv', JsonCSV)
app.component('Multiselect', Multiselect)
app.use(Toaster, {position: 'top-right'})
app.use('custom-data-table', CustomDataTable)
app.use(VueSweetalert2)
app.use(VueHtmlToPaper)
app.use(store)
app.use(router)

app.mount('#app')