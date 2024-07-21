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
import swaggerDocs from "./utils/swagger";


AppDataSource.initialize().then(async () => {

  const alleAngestellten = await AppDataSource.manager.find(Angestellte);
  console.log("Alle Angestellten:", alleAngestellten);

  // create express app
  const app = express()
  app.use(bodyParser.json())
  app.use(cors());






  app.post('/convert', (req: Request, res: Response) => {
    const vttContent = req.body.vtt;
    if (!vttContent) {
        return res.status(400).send('VTT content is required');
    }

    const srtContent = convertVttToSrt(vttContent);
    res.json({ srt: srtContent });
});

function convertVttToSrt(vttContent: string): string {
    const lines = vttContent.split('\n');
    let srtContent = '';
    let srtIndex = 1;

    for (const line of lines) {
        console.log("aufgerufen");
        if (line.trim().length === 0) {
            srtContent += '\n';
        } else if (/^\d{2}:\d{2}:\d{2}\.\d{3}/.test(line)) {
            const srtTimestamp = line.replace('.', ',');
            srtContent += srtTimestamp + '\n';
        } else if (/^\d+$/.test(line)) {
            srtContent += `${srtIndex++}\n`;
        } else if (!/^WEBVTT/.test(line)) {
            srtContent += line + '\n';
        }
    }

    return srtContent;
}


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
 console.log ("IIIIIII");
  // setup express app here
  //app.use('/api', Routes);
  // ...

  // start express server
  app.listen(3000, async () => {

  swaggerDocs(app, 3000);
  console.log("Express server has started on port 3000. Open http://localhost:3000 to see results")
});
}).catch(error => console.log(error))




