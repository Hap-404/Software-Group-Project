require('dotenv').config();

const express = require('express')

const app = express()

app.use(express.json())

const cors = require('cors')
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

app.listen(5000, () => {
    console.log('server is listenning as port 5000')
})
