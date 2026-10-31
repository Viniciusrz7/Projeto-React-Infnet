import app from "./app.js"
import { PORT } from "./config/config.js"

app.listen(PORT, (error) => {
    if (error) {throw error}
    console.log(`Backend rodando em http://localhost:${PORT}`)
})
