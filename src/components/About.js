import {Container, Row, Col, Image} from 'react-bootstrap';

//ASSETS
import imageMonk from '../images/image_monk_about_us.jpg';


export default function About () {
  
    return (
        <div>
          <Container className='text-center ' >
            <Col className='align-items-center'>
              <Row className=''><div className='h2 text-center text-primary'>About Fantasy Bank</div></Row>
              <div className=''>
                <Image src={imageMonk}/>
              </div>
              <Row className=''>
                  <div className='h4 text-justify'>Fantasy Bank was funded in order to help people make money without having to work. Because we believe that people should be free to do as they wish, all while their money is working for them. Here in Fantasy Bank you can get excelent dividends just by clicking on our award winning Make Money™ interface!</div>
                  <div className='h4 text-info'>With Fantasy Bank, all your dreams will come true!</div>
              </Row>
            </Col>
          </Container>

        </div>

    )
  }
