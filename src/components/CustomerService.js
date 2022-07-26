import { Link } from 'react-router-dom';
import {Col, Row} from 'react-bootstrap';


const CustomerService = () => {
    
    return (        
        <div className="row justify-content-center">
        <div className="col-lg-5 d-none d-lg-block bg-customerservice-image"></div>
        
    <div className="col-lg-7">
        <div className="p-5">
            <div className="text-left">
                <h1 className="h5 mb-4"><Link to="/">Home</Link> / Customer Service</h1>
                <h1 className="h4 text-gray-900 text-center" id="cuerpo_forma">Customer Service</h1>
                    <Row className=''>
                        <Col className='text-center'>
                            We have the  best app in the world and we believe you don't really need any customer service. That's why we just don't have Customer Service. 
                            <p>Because we thrive for you.</p>
                        </Col>
                    </Row>
                


               
            </div>
            

        </div>
    </div>
    </div>
)

}

export default CustomerService;