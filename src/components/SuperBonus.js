import { Link } from 'react-router-dom';
import {Col, Row} from 'react-bootstrap';


const SuperBonus = () => {
    
    return (        
        <div className="row justify-content-center">
        <div className="col-lg-5 d-none d-lg-block bg-superbonus-image"></div>
        
    <div className="col-lg-7">
        <div className="p-5">
            <div className="text-left">
                <h1 className="h5 mb-4"><Link to="/">Home</Link> / Super Bonus!</h1>
                <h1 className="h4 text-gray-900 text-center" id="cuerpo_forma">Super Bonus!</h1>
                    <Row>
                        <Col><div className='h1 text-center text-primary'>Earn 1% extra</div></Col>
                        <Col><div className='h3 text-center'>For every $1,000.00 in your account</div></Col>
                    </Row>
                    <Row className=''>
                        <Col className='text-center'>
                            <p>Only Taoke Camilo can help you build your wealth the way you deserve it: fast!!</p> Just deposit more money in your account and anytime you use the Make Money functionality on our site you will earn more interest!
                        </Col>
                    </Row>
                


               
            </div>
            

        </div>
    </div>
    </div>
)

}

export default SuperBonus;