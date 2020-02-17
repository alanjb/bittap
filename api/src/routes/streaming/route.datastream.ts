import { DataStreamController } from "../../controllers/controller.datastream";
import { Request, Response, NextFunction } from "express";

export class DataStreamRoute {
  public datastreamController: DataStreamController = new DataStreamController();

  public route(app:any): void { 
    app.route('/dashboard')
      .get((req: Request, res: Response, next: NextFunction) => {


      })  
      .then((res: Response) => {
          
      })
      .catch((error:any) => {
        window.alert("Error: " + error);
      })
  }

  private init() {
    const { spawn } = require('child_process');
    spawn('sh', ['./api/bin/realtime.sh'], {
      cwd: './api'
    }); 
  }
}