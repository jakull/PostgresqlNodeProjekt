const express = require ('express');
import { Routes } from "./routes/ORMRoutes"
import { Request, Response } from "express"
const sqlRoutes = require('./routes/sqlRoutes');
import { AppDataSource } from "./config/databaseORM"
import { Angestellte } from "./entity/Angestellte";
const { createConnection } = require("typeorm");
require('dotenv').config();
const cors = require('cors');
import * as bodyParser from "body-parser"


AppDataSource.initialize().then(async () => {

  const alleAngestellten = await AppDataSource.manager.find(Angestellte);
  console.log("Alle Angestellten:", alleAngestellten);

  // create express app
  const app = express()
  app.use(bodyParser.json())
  app.use(cors());

  // register express routes from defined application routes
  Routes.forEach(route => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
          const result = (new (route.controller as any))[route.action](req, res, next)
          if (result instanceof Promise) {
              result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

          } else if (result !== null && result !== undefined) {
              res.json(result)
          }
      })
  })

  // setup express app here
  app.use('/api', sqlRoutes);
  // ...

  // start express server
  app.listen(3000)


  console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))




