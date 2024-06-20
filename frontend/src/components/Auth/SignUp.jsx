import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import React, { useState, useEffect } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password) {
            toast.error("Please fill in all the fields.");
            setLoading(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    name: name,
                });
            }
            toast.success("User Registered Successfully!");
            navigate('/');
        } catch (err) {
            toast.error(err.message);
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/')
            }
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme='dark'
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="bg-[#18181D] flex flex-col p-4">
                <form className="flex flex-col items-center p-10 gap-5" onSubmit={handleSignUp}>
                    <table style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: "right", paddingRight: "10px" }}>
                                    <label htmlFor="name" className="font-bold text-white-500">Full Name:</label>
                                </td>
                                <td>
                                    <input
                                        id="name"
                                        className="p-2 text-black"
                                        style={{ width: "250px" }}
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "right", paddingRight: "10px" }}>
                                    <label htmlFor="email" className="font-bold text-white-500">Email:</label>
                                </td>
                                <td>
                                    <input
                                        id="email"
                                        type="email"
                                        className="p-2 text-black"
                                        style={{ width: "250px" }}
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "right", paddingRight: "10px" }}>
                                    <label htmlFor="password" className="font-bold text-white-500">Password:</label>
                                </td>
                                <td style={{ display: "flex", alignItems: "center" }}>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="p-2 text-black"
                                        style={{ width: "250px" }}
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            marginLeft: "10px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        type="submit"
                        className="bg-[#0f0f11] p-3 rounded-xl px-10 hover:bg-black"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex justify-center mt-4">
                                <Oval
                                    height={40}
                                    width={40}
                                    color="#00BFFF"
                                    visible={true}
                                    ariaLabel='loading'
                                />
                            </div>
                        ) : (
                            <>Submit</>
                        )}
                    </button>
                </form>
                <p className='flex justify-end gap-2'>
                    Already have an account? <Link to="/login" className='font-bold hover:text-blue-200 hover:underline'>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
