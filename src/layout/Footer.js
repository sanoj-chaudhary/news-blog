import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const Footer = () => {
    return (
        <footer className="footer-control">
        <div className="scrn-container">
            <div className="row footer-menu">
                <div className="col-xl-2 col-md-4 col-sm-6 col-12">
                    <div className="navbar-toggler-in">
                        <h2>About</h2>
                        <ul>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Code of ethics</a></li>
                            <li><a href="#">Vision & Mission</a></li>
                            <li><a href="#">Terms of use</a></li>
                            <li><a href="#">Site Map</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                            <li><a href="#">Community Guidelines</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-xl-2 col-md-4 col-sm-6 col-12">
                    <div className="navbar-toggler-in">
                        <h2>Contact Us</h2>
                        <ul>
                            <li><a href="#">Connect with us</a></li>
                            <li><a href="#">Advertise with us</a></li>
                            <li><a href="#">Our Apps</a></li>
                            <li><a href="#">Podcast</a></li>
                            <li><a href="#">Submit a Review</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-xl-3 col-md-4 col-sm-6 col-12">
                    <div className="navbar-toggler-in">

                        <h2>Our Network</h2>
                        <ul>
                            <li><a href="#">Asian Tracker Forum</a></li>
                            <li><a href="#">Indian Institute of peace keeping studies</a></li>
                            <li><a href="#">Institute of Human Rights & Public Liberties</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-xl-2 col-md-4 col-sm-6 col-12">
                    <div className="navbar-toggler-in">
                        <h2>Career</h2>
                        <ul>
                            <li><a href="#">Work for us</a></li>
                            <li><a href="#">Qualitative HR</a></li>
                        </ul>
                    </div>
                </div>

                <div className="col-xl-3 col-md-4 col-sm-6 col-12">
                    <div className="logo"><Link className="navbar-brand" href="/"><Image height={80} width={172} alt="logo" src="/images/logo.png" /></Link></div>
                    <div className="mt-5">
                            <p className='fw-bold mb-1'>Follow Us </p>
                            <ul className="socail-list">
                                <li><a href="#" className="socail-link" target="_blank"><Image height={20} alt='social' width={20}
                                    src="/images/social-icon/face1.png" /></a></li>
                                <li><a href="#" className="socail-link" target="_blank"><Image height={20} alt='social' width={20}
                                    src="/images/social-icon/insta.png" /></a></li>
                                <li><a href="#" className="socail-link" target="_blank"><Image height={20} alt='social' width={20}
                                    src="/images/social-icon/youtube.png" /> </a></li>
                                <li><a href="#" className="socail-link" target="_blank"><Image height={20} alt='social' width={20}
                                    src="/images/social-icon/send.png" /></a></li>
                                <li><a href="#" className="socail-link" target="_blank"><Image height={20} alt='social' width={20}
                                    src="/images/social-icon/linkedin.png" /></a></li>
                                <li><a href="#" className="socail-link" target="_blank"><Image height={20} alt='social' width={20}
                                    src="/images/social-icon/koo.png" /></a></li>
                                <li><a href="#" className="socail-link" target="_blank"><Image height={20} alt='social' width={20} src="/images/social-icon/twitter.png" />
                                </a></li>
                            </ul>
                        </div>
                </div>
            </div>
        </div>
    </footer>
    )
}



export default dynamic(()=>Promise.resolve(Footer),{ssr:false})