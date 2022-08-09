import {React, useRef, useState} from 'react'
import { Row, Col, Image, Overlay, Tooltip} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {GetLogedInUserData} from './mysession';

//loads images
import iconDeposit from '../images/icon_deposit.jpg';
import iconWithdraw from '../images/icon_withdraw.jpg';
import iconInviteFriends from '../images/icon_invitefriends.jpg';
import iconSuperbonus from '../images/icon_superbonus.jpg';
import iconCustomerService from '../images/icon_customerservice.jpg';
import iconMakemoney from '../images/icon_makemoney.jpg';

export default function Home () {

    var dataUsuarioLogged = GetLogedInUserData()
    var TotalAssets = Intl.NumberFormat('en-US').format((Math.round(dataUsuarioLogged.Balance * 100) / 100).toFixed(2) + dataUsuarioLogged.PromotionBonus + dataUsuarioLogged.AcumProfits)

    //sets target for Tooltip
    const [show, setShow] = useState(true);
    const target = useRef(null);

    const HideTooltip = () => {
        console.log('hiding tooltip')
        setShow(false);
    }

    //sets interval to hide tooltip in X seconds
    if (show) {
        console.log('tooltip WILL SHOW')
       setTimeout(HideTooltip, 4000);
    }
 
    return (
            
            <div className='justify-content-center'>
                    <div className="m-5">
                        <h4 className='text-left'>Welcome back {dataUsuarioLogged.Nombres}!</h4>
                        <Row className="border-bottom p-2">
                            <Col className="text-left">
                            My total assets: <div className="font-weight-bold h3 text-success">${TotalAssets}</div>
                            </Col>
                        </Row>
                        <Row className='m-2 small'>
                            <Col className='border-right'>
                            <div className="font-weight-bold h5">${Intl.NumberFormat('en-US').format(dataUsuarioLogged.TodaysProfits)}</div>Today's Profits 
                            </Col>
                            <Col>
                            <div className="font-weight-bold h5">${Intl.NumberFormat('en-US').format(dataUsuarioLogged.PromotionBonus)}</div>Promotion Bonus 
                            </Col>
                            <Col className='border-left'>
                            <div className="font-weight-bold h5">${Intl.NumberFormat('en-US').format(dataUsuarioLogged.AcumProfits)}</div>Accumulated Profits
                            </Col>
                        </Row>
                    </div>
                    <div className="m-5">
                        <Row className="m-2">
                            <Col className="h4 font-weight-bold">
                            Main Menu
                            </Col>
                        </Row>
                        <Row className='m-2'>
                            <Col className='p-2'>
                               <Link to="/deposit">
                                    <Image src={iconDeposit} ref={target}/>
                                    <p className="font-weight-bold">Deposit</p>
                                </Link>

                            {/*tooltip over deposit*/}
                            <Overlay target={target.current} show={show} placement="top">
                                {(props) => (
                                <Tooltip {...props}>
                                                            <div>Welcome {dataUsuarioLogged.Nombres}!!</div>
                                                            <div>Start by depositing some money in your account!</div>
                                </Tooltip>
                                )}
                            </Overlay>
                            </Col>
                            <Col className='p-2'>
                            <Link to="/withdraw">
                                    <Image src={iconWithdraw}/>
                                    <p className="font-weight-bold">Withdraw</p>
                                </Link>
                                
                            </Col>
                            <Col className='p-2'>
                            <Link to="/makemoney">
                                    <Image src={iconMakemoney}/>
                                    <p className="font-weight-bold">Make Money!!</p>
                                </Link>
                            </Col>
                        </Row>
                        <Row className='m-2'>
                            <Col className='p-2'>
                            <Link to="/superbonus">
                                <Image src={iconSuperbonus}/>
                                <p className="font-weight-bold">Super Bonus!</p>
                            </Link>
                            
                                
                            </Col>
                            <Col className='p-2'>
                            <Link to="/customerservice">
                                <Image src={iconCustomerService}/>
                                    <p className="font-weight-bold">Customer Service</p>
                            </Link>
                            </Col>
                            <Col className='p-2'>
                            <Link to="/invitefriends">
                                <Image src={iconInviteFriends}/>
                                <p className="font-weight-bold">Invite friends</p>
                            </Link>

                            </Col>
                        </Row>
                    </div>
            </div>
            

        )
}