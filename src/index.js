import app from './app'
import './database'
require('dotenv').config()

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Tu servidor está corriendo en el puerto: ${PORT}`)
})
