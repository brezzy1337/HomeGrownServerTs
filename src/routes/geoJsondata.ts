import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import {PrismaClient } from '@prisma/client';
import extractJWT from '@src/middleware/extractJWT';


const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
    ],
  });

const geoJsonRouter = Router();

geoJsonRouter.get('/getLocalCoordinates', extractJWT, async (req: Request, res: Response, next: NextFunction) => {
    const id: number = res.locals.jwt.id;
    let city: string = '';
    let state: string = '';

    const cityFinder = async() => {
        let userCity = await prisma.location.findMany({
            where: {
              id: id,
            },
            select: {
              city: true
            },
          });
          city = userCity[0].city;
        }
        
        const stateFinder = async() => {  
            let userState = await prisma.location.findMany({
                where: {
                    id: id,
                },
                select: {
                    state: true
                },
            });
            state = userState[0].state;
        }
        
        const LocalCoordinateFetcher = async() => {
            const citySellers = await prisma.user.findMany({
                where: {
                  location: {
                    city: city,
                    state: state
                    },
                  },
                  select: {
                    username: true,
                    location: true,
                    vegetables: true,
                    fruits: true,
                    herbs: true
                  }
                })

            console.log(city);
            console.log(state);
            console.log(citySellers);
            res.json(citySellers);
          }      
         
        
        await cityFinder();
        await stateFinder();
        await LocalCoordinateFetcher();
  });

  export default geoJsonRouter;
