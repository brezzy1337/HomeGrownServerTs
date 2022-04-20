// redo validation and authentication
//const { validateToken } = require('../middlewares/AuthMiddleware');
//const { sign } = require('jsonwebtoken');
import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import signJWT from "../middleware/signJWT";
import extractJWT from "@src/middleware/extractJWT";

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
    ]
});

const router = Router();

router.get('/auth', extractJWT, (req: Request, res: Response, next: NextFunction) => {
    console.log('Token validated, user authorized');

    return res.status(200).json({
        message: 'Authroized'
    });
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = await req.body;
    let hash = await bcrypt.hash(password, 10);
        if(hash === password) {
            throw new Error("password did not hash");
        }
        try {
            await prisma.user.create({
                data: {
                    email: email,
                    username: username,
                    password: hash
                }
            })
        } catch(error) {
            return res.status(500);
        }
        let user= await prisma.user.findUnique({ where: { username: username }, select: {id:true, email:true, username:true, password:true}});
        signJWT((user), (error, token) => {
            if(error) {
                return res.status(401).json({
                    message: "Unable Sign JWT",
                    error: error
                });
            }
            else if (token) {
                return res.status(200).json({
                    message: 'Auth Successful',
                    token,
                    username                
                })
            }

        })
        console.log(`User ${username} created and Token signed`);
        return res.status(201);
    //    });
    });

router.post('/location', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
    //grab username from token
    const { address, state, zip } = await req.body;
    let username: string = res.locals.jwt.username;
    let id: number = res.locals.jwt.id;     
    let Zip = parseInt(zip);
    console.log(res.locals.jwt.id, res.locals.jwt.username);

    await prisma.location.create({
        data:{
            address: address,
            state: state,
            zip: Zip,
            user: {
                connect: {
                    id: id
                }, 
            },
        },
    });

console.log(`User ${username} location saved`);
return res.status(201).json(`User ${username} location saved`);
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const {username, password} = req.body;

    try {
        let user= await prisma.user.findUnique({ where: { username: username }, select: {id:true, email:true, username:true, password:true}});
        
        if(!user) res.json({ error: "User Doesn't Exist" });

        let match = await bcrypt.compare(password, user.password);

            if (!match) res.json({error: "Username Or Password Invalid"});
    
            signJWT((user), (error, token) => {
                if(error) {
                    return res.status(401).json({
                        message: "Unable Sign JWT",
                        error: error
                    });
                }
                else if (token) {
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token,
                        username                
                    })
                }
    
            })
    } catch (error) {
        console.error(error);
    }
});

router.post('/BraintreePaypal', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
    const {customerid, paymentMethodid } = req.body;
    let username: string = res.locals.jwt.username;
    let id: number = res.locals.jwt.id;     

    await prisma.paymentMethods.create({
        data: {
            card: undefined,
            cash: true,
            Crypto: undefined,
            user: {
                connect: {
                    id: id
                }
            }
        },
    });

    await prisma.customerID.create({
        data: {
            CustomerId: customerid,
                paymentMethod: {
                    connect: {
                        id: id
                }
            }
        },
    });

    await prisma.paymentMethodID.create({
        data: {
            PaymentMethodId: paymentMethodid,
            customerId: {
                connect: {
                    id: id
                }
            }
        },
    });
       
    console.log(`User ${username} Paypal payment method saved`);
    return res.status(201).json(`User ${username} Paypal payment method saved`);
});

// Reamp completely
/*router.post('/payment', async (req, res) => {
    const { paymentType, cardType, cardNumber, cardName, expirationDate, cvv} = req.body;
            db.paymentMethods.create({
                paymentType: paymentType,
                cardType: cardType,
                cardNumber: cardNumber,
                cardName: cardName,
                expirationDate: expirationDate,
                cvv: cvv
        });
    res.json("Payment Method Added")
});

*/  

export default router;
