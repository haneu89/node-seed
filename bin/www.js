const app = require('../app/index')
const port = 8888;

app.listen(port, () => {
    console.log(`server start => port : ${port}`)
})