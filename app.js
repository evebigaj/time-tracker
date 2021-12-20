const express = require('express');
const app = express()
// const path = require('path')
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//  res.sendFile(path.resolve(__dirname, './public/index.html'))} )
let array =[]
app.post('/', (req, res) =>{
    console.log(req.body)
array.push(req.body.input);
console.log(array)
let total = array.reduce((a,b) => Number(a)+Number(b))
console.log(total)
res.status(200).json({ success: true, data: total })
})
app.listen(4000, ()=>{console.log('listening on port 4000')})