import { Link } from 'react-router-dom';
import {Col, Row} from 'react-bootstrap';


const Inviteriends = () => {
    
    return (        
        <div className="row justify-content-center">
        <div className="col-lg-5 d-none d-lg-block bg-invitefriends-image"></div>
        
    <div className="col-lg-7">
        <div className="p-5">
            <div className="text-left">
                <h1 className="h5 mb-4"><Link to="/">Home</Link> / Invite Friends</h1>
                <h1 className="h4 text-gray-900 text-center" id="cuerpo_forma">Invite Friends</h1>
                    <Row className=''>
                        <Col className='text-center'>
<p>We are currently working on our Referral Program.</p> But hey, that should not stop you from inviting your friends and family to this great opportunity!!

                        </Col>
                    </Row>
                


               
            </div>
            

        </div>
    </div>
    </div>
)

}

export default Inviteriends;