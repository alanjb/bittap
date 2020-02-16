// /lib/routes/crmRoutes.ts
import { ContactController } from "../controllers/crmController";

public contactController: ContactController = new ContactController();
// Create a new contact
app.route('/contact')
   .post(this.contactController.addNewContact);