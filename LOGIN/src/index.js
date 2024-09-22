require('dotenv').config(); 

const express = require("express")
const app = express()
const path = require("path")
const exphbs = require('express-handlebars');
const collection = require("./mongodb")
const cors = require('cors')

app.engine('hbs', exphbs.engine({ 
    extname: 'hbs',
    defaultLayout: false // Set to true if using layouts
  }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views')); // Ensure the views folder path is correct
app.use(express.urlencoded({extended:true}))

console.log(path.join(__dirname, 'views'));

app.get("/",(req,res)=>{
    res.render('login');
})
app.get("/signup",(req,res)=>{
    res.render('signup');
})

app.post("/signup", async (req,res)=>{

    try {
        const data = {
            username: req.body.username, 
            email: req.body.email,
            password: req.body.password
         }
         
        const existingUser = await collection.findOne({ username: data.username });
     
        if (existingUser) {
            res.send('User already exists. Please choose a different username.');
        } else {
            
            const userdata = await collection.create(data);
            console.log(userdata);
             res.render("login") 
        }
      } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).render('signup', { error: 'Internal Server Error. Please try again later.' });
      }
    
});

app.post("/login", async (req,res)=>{
 
    try{
       const check = await collection.findOne({username:req.body.username})

        if(check.password===req.body.password){
            res.render("home")
        }        
       else{
        res.send("wrong password")
       }
    }
    catch{
        res.send("wrong details")
    }
    
 
 })
 
app.listen(5000, ()=>{
     console.log("Port Connected");
})

app.use(
    cors({
        origin: 'http://127.0.0.1:5501',
        methods: ['POST']
    })
)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const storeItems = new Map([
    [1,{priceInCents: 2000000, name: 'Hostel Room'}],
])

app.post('/create-checkout-session', async (req,res) => {
    try{
        if (!req.body.items || !Array.isArray(req.body.items)) {
            return res.status(400).json({ error: 'Invalid items array' });
        }
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return{
                    price_data:{
                        currency: 'inr',
                        product_data: {
                            name: storeItem.name,
                            
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        })
        res.json({url: session.url})
    }catch(e){
        res.status(500).json({ error: e.message})
    }
})

