import Link from "next/link";
import { getAccessToken, InputField } from "./../../utils";
import LikeBlogCard from "./../components/LikeBlogCard";
import Head from "next/head";
import { loginSchema } from "./../../utils/ValidationSchema";
import { useFormik } from "formik";
import { useState } from "react";
import { showProfile } from "./../http/auth-apis";
import { allFeatured, login } from "./../http";
import axios from "axios";
import { setAccessToken, setUserProfile } from "./../../utils";
import { toast } from 'react-toastify';
import Router from "next/router";
const Login = ({ data = [] }) => {


    const [active, setActive] = useState(false)

    const [inputValue, setInputValue] = useState({
        username: "",
        password: "",
    });

    const {
        values,
        errors,
        touched,
        setFieldValue,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: inputValue,
        validationSchema: loginSchema,
        onSubmit: async (values, action) => {
            try {
                const loginRes = await login(values);
                if (!loginRes.data.bool) {

                    if (loginRes.data) {

                        setAccessToken(loginRes.data.token);
                        try {
                            const headers = {
                                Authorization: `Bearer ${loginRes.data.token}`,
                            };
                            setActive(true)
                            const res = await axios.post(
                                "https://express.digitemtech.com/api/auth/profile/show/Shz85ugerK267DR1",
                                {},
                                { headers }
                            );
                            if (res.data.bool) {
                                setUserProfile(res.data.data);
                            }

                        } catch (error) {
                            console.log("message", error.message);
                        }

                        Router.push("/");
                        setActive(false)
                    } else {
                        toast.error('Wrong Credential', {
                            position: "bottom-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            } catch (error) {
                toast.error('Wrong Credential', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        },
    });
    return (
        <>
            <Head>
                <link href={"/css/login.css"} rel={"stylesheet"} />
            </Head>
            <div className="container">
                <div className="row align-items-center my-4">
                    <div className="col-md-6 my-auto">
                        <form onSubmit={handleSubmit}>
                            <fieldset className="login-form">
                                <legend><h4 className="fw-bold">Sign In</h4></legend>
                                <div className="form-outline ">
                                    <InputField
                                        type={"username"}
                                        name={"username"}
                                        value={values.username}
                                        label={"Username"}
                                        onChange={handleChange}
                                    />
                                    {errors.username && touched.username ? (
                                        <p className="form-error">{errors.username}</p>
                                    ) : null}
                                </div>
                                <div className="form-outline ">
                                    <InputField
                                        type={"password"}
                                        name={"password"}
                                        value={values.password}
                                        label={"Password"}
                                        onChange={handleChange}
                                    />
                                    {errors.password && touched.password ? (
                                        <p className="form-error">{errors.password}</p>
                                    ) : null}
                                </div>
                                <div className="row">
                                    <div className="col d-flex ">
                                        <div className="form-check" style={{ marginTop: "8px" }}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="rememberme"
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="rememberme"

                                            >
                                                {" "}
                                                Remember me{" "}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col d-flex justify-content-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-block"
                                            disabled={active}
                                        >
                                            Sign in {active ? <i className="fa fa-spinner fa-spin"></i> : ''}
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link href="#!">Forgot password?</Link>
                                    <Link href="/register" className="text-decoration-none">
                                        Create Account
                                    </Link>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <div className="pt-5 pb-4 loginRightSideWrapper px-4">
                            <span className="text-white fw-bold d-flex justify-content-center mb-4">
                                Articles You may like
                            </span>

                            {data.bool &&
                                data.data.length > 0 &&
                                data.data.map((item, key) => (
                                    <LikeBlogCard
                                        key={key}
                                        imgSrc={item.image}
                                        tittle={item.tittle}
                                        description={item.description}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

export async function getStaticProps(context) {
    const { data } = await allFeatured({ limit: 3 });

    return {
        props: { data },
    };
}
