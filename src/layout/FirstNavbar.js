import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountry } from '../../redux/countrySlice'
import { getAccessToken, logoutUser, getUserProfile } from '../../utils';
import { fetchCategory } from '../../redux/categorySlice';
import Image from 'next/image'
import { menuCategory } from '../http';
const FirstNavbar = () => {

    const dispatch = useDispatch();

    const [category,setCategory] = useState();

    const getMenuCategory = async () =>{
        try {
            const { data } = await menuCategory();
            console.log(data,"data")
            if (data.bool) {
                setCategory(data.data)
            }
          } catch (error) {
            console.log(error)
          }
    }


        // const { data: category } = useSelector((state) => state.category);
        const { data: country } = useSelector((state) => state.country);

   
    const { query } = useRouter();
    const router = useRouter();

    const [user, setUser] = useState()
    const checkSlug = router.query.slug;

    const { cu: countryid } = router.query;
    let pathUrl = ''
    if (checkSlug && checkSlug.length === 2) {
        pathUrl = 'all'

    }

    const navigate = (id) =>
        router.push({
            pathname: `/category/${id}${pathUrl ? '/' + pathUrl : ''}`,
            query: countryid ? "cu=" + countryid : null
        });

    useEffect(() => {

        dispatch(fetchCountry());
        // dispatch(fetchCategory());
        getMenuCategory()
        setUser(JSON.parse(getUserProfile()))
    }, [])
    let cotegorySlug = ''
    let cot = '';
    let cu = '';
console.log(category,"category")
    return (
        <>
            <Head>
                <link href={'/css/navbar.css'} rel={'stylesheet'} />
            </Head>

            <header>
                <section className="header-social">
                    <div className="header-social-box scrn-container">
                        <div className="social-icon-box">
                            <div className="socail-list">
                                Follow Us :
                                <a href="#" className="socail-link px-2" target="_blank">
                                    <Image
                                        height={20}
                                        alt="social"
                                        width={20}
                                        src="/images/social-icon/face1.png"
                                    />
                                </a>
                                <a href="#" className="socail-link pe-2" target="_blank">
                                    <Image
                                        height={20}
                                        alt="social"
                                        width={20}
                                        src="/images/social-icon/insta.png"
                                    />
                                </a>
                                <a href="#" className="socail-link pe-2" target="_blank">
                                    <Image
                                        height={19}
                                        alt="social"
                                        width={20}
                                        src="/images/social-icon/youtube.png"
                                    />{" "}
                                </a>
                                <a href="#" className="socail-link pe-2" target="_blank">
                                    <Image
                                        height={20}
                                        alt="social"
                                        width={20}
                                        src="/images/social-icon/send.png"
                                    />
                                </a>
                                <a href="#" className="socail-link pe-2" target="_blank">
                                    <Image
                                        height={20}
                                        alt="social"
                                        width={20}
                                        src="/images/social-icon/linkedin.png"
                                    />
                                </a>
                                <a href="#" className="socail-link pe-2" target="_blank">
                                    <Image
                                        height={20}
                                        alt="social"
                                        width={20}
                                        src="/images/social-icon/koo.png"
                                    />
                                </a>
                                <a href="#" className="socail-link pe-2" target="_blank">
                                    <Image
                                        height={20}
                                        alt="social"
                                        width={20}
                                        src="/images/social-icon/twitter.png"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="header-main-menu">
                    <div className="header-container">
                        <nav className="navbar navbar-expand-lg main-navbar">
                            <div className="scrn-container header-mani-container container-fluid">
                                <Link className="navbar-brand" href="/"><Image height={50} width={110} alt="logo" src="/images/logo.png" /></Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav my-main-menu">
                                        <li className="nav-item">
                                            <span onClick={() => router.push('/')} className={`'cursor-pointer text-capitalize nav-link link-color' ${router.pathname == '/' ? 'border_bottom' : ''}`}
                                            >Home</span>
                                        </li>
                                        {
                                           category &&  category.length != 0 && category.map((menu, key) => {
                                                cot = menu.id;
                                                return (
                                                    <li className="nav-item" key={menu.id}>
                                                        <span
                                                            className={
                                                                window.location.pathname.includes(menu.slug)
                                                                    ? "cursor-pointer text-capitalize nav-link link-color border_bottom"
                                                                    : "cursor-pointer text-capitalize nav-link link-color"
                                                            }

                                                            onClick={() => navigate(menu.slug)}

                                                        >
                                                            {menu.title}
                                                        </span>
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                                <div className="user-and-search-box">

                                    <div className="user-auth">
                                        <div className="dropdown user-dropdown">
                                            {

                                                getAccessToken() ?
                                                    <div className="dropdown second-header-auth-dropdown">
                                                        <button className="btn btn-secondary dropdown-toggle second-header-auth-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <Image height={20} width={18} alt='profile' src="/images/social-icon/Profile.svg" />&nbsp;<span>{user ? user.name : 'User'}</span>
                                                        </button>
                                                        <ul className="dropdown-menu second-header-auth-menu">
                                                            <li><Link className="dropdown-item second-header-auth-item" href="/auth/profile">My Account</Link></li>

                                                            <li><button className="dropdown-item second-header-auth-item" onClick={logoutUser}>Logout</button></li>
                                                        </ul>
                                                    </div>

                                                    :
                                                    <Link className="loginWrapper " href="/login"
                                                    >
                                                        <Image height={12} width={12} alt="login" src="/images/Profile.svg" /> <span>Login</span>
                                                    </Link>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </section>
                <section className="color-header">
                    <div className="scrn-container">
                        <ul className="color-menu">

                            {
                                country && country.length != 0 && country.map((item) => {

                                    cu = item.slug;
                                    return (
                                        <li className="nav-item" key={item.id}>
                                            <Link className='text-capitalize color-li-link cursor-pointer'
                                                href={{

                                                    pathname: router.query.slug === 'news' ? '/' : router.pathname,
                                                    query: checkSlug === 'news' ? "cu=" + cu : { ...query, cu }
                                                }}

                                                // onClick={()=>countrynavigate(item.slug)}
                                                passHref
                                            // shallow
                                            // replace
                                            >{item.title}</Link>

                                        </li>
                                    )
                                })
                            }


                        </ul>
                    </div>
                </section>
            </header>
        </>
    )

}

export default dynamic(() => Promise.resolve(FirstNavbar), { ssr: false }) 