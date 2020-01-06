import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import ButtonSwitch from './ButtonSwitch';

const Example = (props) => {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);

  return (
    <div className="servercard" onClick={toggle}>
      <span className="server-card-header"> <ButtonSwitch/> Server_Alpha</span>
     
      <Collapse isOpen={collapse}>  
        <Card>
         <CardBody>
          Anim pariatur cliche reprehenderit,
          enim eiusmod high life accusamus terry richardson ad squid. Nihil
          anim keffiyeh helvetica, craft beer labore wes anderson cred
          nesciunt sapiente ea proident.
        </CardBody>
      </Card>
     </Collapse>
    </div>


  );
}

export default Example;