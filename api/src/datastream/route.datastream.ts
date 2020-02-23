import { Request, Response, NextFunction } from "express";

export class Routes {
  // public datastreamController: DataStreamController = new DataStreamController();

  public routes(app:any): void { 
    app.route('/dashboard')
      .get((req: Request, res: Response, next: NextFunction) => {
        res.status(200).send({
          message: 'GET request successful!'
      })
        this.init();
      })  
  }

}