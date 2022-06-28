// redo validation and authentication
//const { validateToken } = require('../middlewares/AuthMiddleware');
//const { sign } = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import {PrismaClient } from '@prisma/client';
import signJWT from '../middleware/signJWT';
import extractJWT from '@src/middleware/extractJWT';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

const router = Router();

router.get('/auth', extractJWT, (req: Request, res: Response, next: NextFunction) => {
  console.log('Token validated, user authorized');

  return res.status(200).json({
    message: 'Authroized',
  });
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password } = await req.body;
  let hash = await bcrypt.hash(password, 10);
  if (hash === password) {
    throw new Error('password did not hash');
  }
  try {
    await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hash,
      },
    });
  } catch (error) {
    return res.status(500);
  }
  let user = await prisma.user.findUnique({
    where: { username: username },
    select: { id: true, email: true, username: true, password: true },
  });
  signJWT(user, (error, token) => {
    if (error) {
      return res.status(401).json({
        message: 'Unable Sign JWT',
        error: error,
      });
    } else if (token) {
      return res.status(200).json({
        message: 'Auth Successful',
        token,
        username,
      });
    }
  });
  console.log(`User ${username} created and Token signed`);
  return res.status(201);
  //    });
});

router.post('/location', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
  //grab username from token
  const { address, city, state, zip } = await req.body;
  let username: string = res.locals.jwt.username;
  let id: number = res.locals.jwt.id;
  let Zip = parseInt(zip);
  console.log(res.locals.jwt.id, res.locals.jwt.username);
  const location = `${address} ${city} ${zip}, ${state}`;
  const token = 'pk.eyJ1IjoiYnJlenp5MTMzNyIsImEiOiJjbDNub2F0cmYwNzdnM2VwZTI2MGVzbGltIn0.eTKEAPZEfLc_G50g6W_ZxA'
  let formattedLocation = `${location.replaceAll(`. `, "%20").replaceAll(', ', '%20')}`;
  let longitude = 0;
  let latitude = 0;

  await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedLocation}.json?country=US&access_token=${token}`).then((response) => {
    console.log(response);
    console.log(response.data.features[0].center);
    longitude = response.data.features[0].center[0];
    latitude = response.data.features[1].center[1];
})

  await prisma.location.create({
    data: {
      address: address,
      city: city,
      state: state,
      zip: Zip,
      longitude: longitude,
      latitude: latitude,
      
      user: {
        connect: {
          id: id,
        },
      },
    },
  });

  console.log(`User ${username} location saved`);
  return res.status(201).json(`User ${username} location saved`);
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    let user = await prisma.user.findUnique({
      where: { username: username },
      select: { id: true, email: true, username: true, password: true },
    });

    if (!user) res.json({ error: "User Doesn't Exist" });

    let match = await bcrypt.compare(password, user.password);

    if (!match) res.json({ error: 'Username Or Password Invalid' });

    signJWT(user, (error, token) => {
      if (error) {
        return res.status(401).json({
          message: 'Unable Sign JWT',
          error: error,
        });
      } else if (token) {
        return res.status(200).json({
          message: 'Auth Successful',
          token,
          username,
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
});

router.get('/getlocation', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
  const id: number = res.locals.jwt.id;

  const location = await prisma.location.findUnique({
    where: {
      id: id,
    },
    select: {
      address: true,
      city: true,
      zip: true,
      state: true
    }
  });
  res.json(location);
  console.log(location);
});

router.get('/getUserCoordinates', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
  const id: number = res.locals.jwt.id;

  const userCoordinates = await prisma.location.findUnique({
    where: {
      id: id,
    },
    select: {
      longitude: true,
      latitude: true
    }
  });
  res.json(userCoordinates);
  console.log(userCoordinates);
});

router.get('/getUsername', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
  const username: string = res.locals.jwt.username;
  res.json(username);
  console.log(username);
});

router.get('/getPaypalCustId', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
  const id: number = res.locals.jwt.id;

  const customerID = await prisma.customerID.findUnique({
    where: {
      id: id,
    },
  });
  res.json(customerID);
  console.log(customerID);
});

router.post('/BraintreePaypal', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
  const { customerid, paymentMethodid } = req.body;
  let username: string = res.locals.jwt.username;
  let id: number = res.locals.jwt.id;

  await prisma.paymentMethods.create({
    data: {
      card: undefined,
      cash: true,
      Crypto: undefined,
      user: {
        connect: {
          id: id,
        },
      },
    },
  });

  await prisma.customerID.create({
    data: {
      CustomerId: customerid,
      paymentMethod: {
        connect: {
          id: id,
        },
      },
    },
  });

  await prisma.paymentMethodID.create({
    data: {
      PaymentMethodId: paymentMethodid,
      customerId: {
        connect: {
          id: id,
        },
      },
    },
  });

  console.log(`User ${username} Paypal payment method saved`);
  return res.status(201).json(`User ${username} Paypal payment method saved`);
});

router.post('/postVegtable', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
  const { produceName, price, amount } = await req.body;
  let id: number = res.locals.jwt.id;

  await prisma.postedVegetables.create({
    data: {
        userId : id,
        name: produceName,
        price: price,
        amount: amount
    },
  });
  console.log(`Produce ${produceName} added to user ${id} priced at ${price} with a quntity of ${amount}`);
  return res.status(201).json(`Produce ${produceName} added to user ${id}`);
});

router.post('/postFruit', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
  const { produceName, price, amount } = await req.body;
  let id: number = res.locals.jwt.id;

  await prisma.postedFruit.create({
    data: {
        userId : id,
        name: produceName,
        price: price,
        amount: amount
    },
  });
  console.log(`Produce ${produceName} added to user ${id} priced at ${price} with a quntity of ${amount}`);
  return res.status(201).json(`Produce ${produceName} added to user ${id}`);
});

router.post('/postHerb', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
  const { produceName, price, amount } = await req.body;
  let id: number = res.locals.jwt.id;

  await prisma.postedHerbs.create({
    data: {
        userId : id,
        name: produceName,
        price: price,
        amount: amount,
        dried: false
    },
  });
  console.log(`Produce ${produceName} added to user ${id} priced at ${price} with a quntity of ${amount}`);
  return res.status(201).json(`Produce ${produceName} added to user ${id}`);
});

router.post('/updateVegtable', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
  const { produceName, price, amount } = await req.body;
  let id: number = res.locals.jwt.id;

  await prisma.postedVegetables.update({
    where:{
        id:id
    },
    data: {
        userId : id,
        name: produceName,
        price: price,
        amount: amount
    }
  });
});

router.get('/getVegatables', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
    let id: number = res.locals.jwt.id;
    const postedVegetables = await prisma.postedVegetables.findMany({
        where: { userId: id },
        select: {
          name: true,
          price: true,
          amount: true
        }
    });
    res.json(postedVegetables);
    console.log(postedVegetables);
  });

router.get('/getFruits', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
    let id: number = res.locals.jwt.id;
    const postedFruits = await prisma.postedFruit.findMany({
        where: { userId: id },
        select: {
          name: true,
          price: true,
          amount: true
        }
    });
    res.json(postedFruits);
    console.log(postedFruits);
  });

router.get('/getHerbs', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
    let id: number = res.locals.jwt.id;
    const postedHerbs = await prisma.postedHerbs.findMany({
        where: { userId: id },
        select: {
          name: true,
          price: true,
          amount: true
        }
    });
    res.json(postedHerbs);
    console.log(postedHerbs);
  });

export default router;
