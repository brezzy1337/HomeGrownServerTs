/*import { ExpressRouter, POST, Body, Params } from 'express-router-ts'
import { Response } from 'express';
import bcrypt = require('bcryptjs');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface userLoginAttempt {
    username: string
    password: string
}

class UserRouter extends ExpressRouter {


	@POST({path:'/register'})  
	async register(@Body('email') email: string, @Body('username') username: string, @Body('password') password: string) {
        await bcrypt.hash(password, 10).then((hash) => {
            prisma.user.create({
                data: {
                    email: email,
                    username: username,
                    password: password
                }
            })

        });
	};

    async location(@Body('address') address: string, @Body('state') state: string, @Body('zip') zip: number, @Params('id') id: Number) {
        await prisma.location.create({
            data: {
                address: address,
                state: state,
                zip: zip,
            },
            user: {
                connect: {
                    id: Number(id)
                }
            }
        })
    }

    @POST({path: '/login'})
    async login(@Body('username') username: string, @Body('password') password: string, res: Response) {
    let user: userLoginAttempt = {username, password};
    try {
        user = await prisma.user.findUnique({ where: { username: username } });
        
        if(!username) res.json({ error: "Username Or Password Invalid" });
    
        bcrypt.compare(password, user.password).then(async (match) => {
            if (!match) {
               return res.json({error: "Username Or Password Invalid"});
            }
            /*const accessToken = sign({username: user.username, id: user.id },
                "importantsecret");
    
                res.json(accessToken);
        });
    } catch (error) {
        console.error(error);
    }

    }
}

P*/