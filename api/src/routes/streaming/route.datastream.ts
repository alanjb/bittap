import { DataStreamController } from "../../controllers/controller.datastream";
import { Request, Response, NextFunction } from "express";

export class DataStreamRoute {
  public datastreamController: DataStreamController = new DataStreamController();

  public route(app:any): void { 
    app.route('/dashboard')
      .get((req: Request, res: Response, next: NextFunction) => {
        res.status(200).send({
          
        })
        this.init();
      })  
  }

  private init() {
    const { spawn } = require('child_process');
    //create child process in current working directory which is /api
    spawn('sh', ['./api/bin/realtime.sh'], {
      cwd: './api'
    })
    .then((res: Response) => {
          
    })
    .catch((error:any) => {
      window.alert("Error: " + error);
    })
  }
}