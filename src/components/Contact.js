import {Container, Row, Col, Image} from 'react-bootstrap';

//ASSETS
import imageHands from '../images/image_hands_contact_us.jpg';



export default function Contact () {
    return (
      <Container className='text-center ' >
      <Col className='align-items-center'>
        <Row className=''><div className='h2 text-center text-primary'>Contact Us!</div></Row>
        <div className=''>
                <Image src={imageHands}/>
              </div>
        <Row className=''>
            <div className='h4'>We're always happy to get in touch with you. Just put your hands togheter and get into your favorite meditative posture; you will feel the light of our great leader within you.</div>
        </Row>
      </Col>
    </Container>

    )
}
