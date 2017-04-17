const app = require('../app/index')
const port = 8888;

const test = require('../app/batch')
test.scrapper()

app.listen(port, () => {
    console.log(`server start => port : ${port}`)
})