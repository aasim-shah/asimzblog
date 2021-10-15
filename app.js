const express = require('express')
const conn = require('./db/conn')
const Products = require('./models/products')
const path = require('path')
const hbs = require('hbs')
const fileupload = require('express-fileupload');
const { urlencoded } = require('body-parser')
const { ESRCH } = require('constants')
const app = express();
const port = process.env.PORT  || 80 ;
const partials = path.join(__dirname , '/views/partials')
hbs.registerPartials(partials);
app.use(express.json());
app.use(urlencoded({extended:false}))
app.set('view engine' , 'hbs')
app.use( express.static('public'))
app.use(fileupload())
let imagesPath = path.join(__dirname , './public/images/')
app.use('/products' ,  express.static(path.join(__dirname , './public')))
app.use('/product' ,  express.static(path.join(__dirname , './public')))

app.get('/' , async(req , res) => {
  const data = await Products.find().limit(10)
    await res.render('home' , {items : data})
})
let we = [{name : 'asim' , price : '223'} , {name : 'shshsh'}]
app.get('/products' , async(req , res) => {
   
  const data = await Products.find()
    res.render('products' , {items : data})

})

app.post('/addproduct' , async (req, res) =>{
  let image = req.files.pImage;
  let imageName = req.files.pImage.name;
  let imagePath = 'images/'+imageName;
  let  addproduct = new Products({
    name : req.body.pName,
    price : req.body.pPrice,
    image : imagePath
  })
   let done =  await image.mv('./public/'+imagePath ,  ()=> {
    res.send(done)
  })
  let uploaded = await addproduct.save();
  
  res.redirect('/products')
})

app.get('/product/:name' , async(req , res) => {
  let name = req.params.name;
 let dataa = await Products.findOne({name : name})
res.render('product' , {product : dataa})
})

app.post('/search' , async (req, res) =>{
  let name = req.body.we;
  let dataa = await Products.findOne({name : name})
  console.log(dataa);
})
app.listen(port , () => {
  console.log(`server is  listening on port ${port}`);
})