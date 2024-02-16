import { Link, useNavigate } from "react-router-dom";
import LetterIcon from "../../assets/Letter.svg";
import LockIcon from "../../assets/Lock.svg";
import UserIcon from "../../assets/User.svg";
import { useContext, useState } from "react";
import { useCookieContext } from "../../context/CookieContext";
import Context from "../../context/GlobalContext";
import { useForm } from "react-hook-form";







function RegisterForm()
 {

    const { setCookie } = useCookieContext()
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const { setOrders } = useContext(Context);
    const {register,handleSubmit,formState: { errors }} = useForm();
    
    const onSubmit = (data) => {
        signUp();
        console.log(data);
    };

    const signUp = async () => {
        try {
            console.log(formData)
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                body: JSON.stringify(formData),
                headers:
                {
                    "Content-type": "application/json"
                }
            })

            if (response.ok)
             {
                const data = await response.json();
                const token = data.user.token;
                setCookie('accessToken', token, { path: '/' });
                setOrders([])
                navigate("/mainpage")
            }
            else {
                console.log(response.status)
                console.log(response.json())
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setFormData((prevForm) => ({
            ...prevForm,
            [name]: value
        }))

        console.log(formData)
    }


    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold">Hello Again!</h2>
            <p className="text-2xl">Welcome Back</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center sm:grid grid-cols-2 sm:gap-4 w-full max-w-[850px] mt-6 px-10" action="">
                <div className="text-center">

                    <div className='flex items-center my-2 rounded-[30px] w-full sm:max-w-[400px] border border-zinc-100 h-fit px-3'>
                        <img
                            className="w-[24px] h-[24px] text-[#C2C2C2]"
                            src={UserIcon}
                            alt="letterIcon"
                        />
                        <input {...register("name", {
                            required: true,
                            minLength: 2
                        })}
                            onChange={(e) => handleChange(e)} name='name' className="px-3 py-3 mx-1 h-full w-full outline-none" placeholder='Name' type="text" />
                    </div>
                    {errors.name && errors.name.type === "required" && (
                        <p className="text-red-600  errorMsg">Name is required!</p>
                    )}
                    {errors.name && errors.name.type === "minLength" && (
                        <p className="text-red-600  errorMsg">
                            Name should be at least 2 characters...
                        </p>
                    )}
                </div>
                <div className="text-center">

                    <div className='flex items-center my-2 rounded-[30px] w-full sm:max-w-[400px] border border-zinc-100 h-fit px-3'>
                        <img
                            className="w-[24px] h-[24px] text-[#C2C2C2]"
                            src={UserIcon}
                            alt="letterIcon"
                        />
                        <input {...register("surname", {
                            required: true,
                            minLength: 3
                        })}
                            onChange={(e) => handleChange(e)} name='surname' className="px-3 py-3 mx-1 h-full w-full outline-none" placeholder='Surname' type="text" />
                    </div>
                    {errors.surname && errors.surname.type === "required" && (
                        <p className="text-red-600  errorMsg">Surname is required!</p>
                    )}
                    {errors.surname && errors.surname.type === "minLength" && (
                        <p className="text-red-600  errorMsg">
                            Password should be at least 8 characters...
                        </p>
                    )}
                </div>
                <div className="text-center">

                    <div className='flex items-center my-2 rounded-[30px] w-full sm:max-w-[400px] border border-zinc-100 h-fit px-3'>
                        <img
                            className="w-[24px] h-[24px] text-[#C2C2C2]"
                            src={LetterIcon}
                            alt="letterIcon"
                        />
                        <input {...register("email", {
                            required: "Email is required.",
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: "Email is not valid..."
                            }
                        })}
                            onChange={(e) => handleChange(e)} name='email' className="px-3 py-3 mx-1 h-full w-full outline-none" placeholder='Email Address' type="email" />
                    </div>
                    {errors.email && <p className="text-red-600 errorMsg">{errors.email.message}</p>}
                </div>

                <div className="text-center">

                    <div className='flex items-center my-2 rounded-[30px] w-full sm:max-w-[400px] border border-zinc-100 h-fit px-3'>
                        <img
                            className="w-[24px] h-[24px] text-[#C2C2C2]"
                            src={LockIcon}
                            alt="letterIcon"
                        />
                        <input {...register("password", {
                            required: true,
                            minLength: 8
                        })}
                            onChange={(e) => handleChange(e)} name='password' className="px-3 py-3 mx-1 h-full w-full outline-none" placeholder='Password' type="password" />
                    </div>
                    {errors.password && errors.password.type === "required" && (
                        <p className="text-red-600  errorMsg">Password is required!</p>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                        <p className="text-red-600  errorMsg">
                            Password should be at least 8 characters...
                        </p>
                    )}
                </div>
                <div className="w-full flex col-span-2 justify-center">
                    <button className="bg-green-400 w-full sm:max-w-[400px]  mt-4 text-white py-2 " type="submit">Register</button>
                </div>
            </form>
            <div className="text-teal-800 mt-3">
                <span>Do you have any account? </span>
                <Link to="/login" className="underline">Log In</Link>
            </div>
        </div>
    )
}

export default RegisterForm