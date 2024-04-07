import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//Import resources
import './assets/css/normalize.css'
import './assets/css/responsive.css'
import './assets/css/styles.css'
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
