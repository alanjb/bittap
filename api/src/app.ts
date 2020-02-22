import express from 'express';
import * as path from 'path';
import logger = require('morgan');
import * as bodyParser from 'body-parser';
import { Routes } from "./routes/route.datastream";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public route: Routes = new Routes();

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.route.routes(this.express);   
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({extended: false}))
    this.express.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    })
  }
}

export default new App().express