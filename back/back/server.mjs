import express from "express";;
import corse from 'cors';
const app = express();
app.use(corse());

app.get('/', (req, res) => {
    res.json({ message: 'hello yall' })
})


app.listen(2000, () => console.log('server is up and running on port 2000'))