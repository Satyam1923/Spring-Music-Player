import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from './firebase';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth-slice';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword( email, password);
            const user = userCredential.user;
            toast.success("User Logged In Successfully!");
            dispatch(logIn({ username: user.displayName, email: user.email }));
            navigate('/');
        } catch (err) {
            toast.error(err.message);
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };
    const goggleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            toast.success("User logged in successfully");
            await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL
            });
            dispatch(logIn({ username: user.displayName, email: user.email }));
            navigate('/');
        } catch (err) {
            toast.error(err.message);
            console.log(err.message);
        }
    };


    const fetchUserData = async () => {
        auth.onAuthStateChanged((async (user) => {
            //   console.log(user);
            if (user) {
                navigate('/')
            }
        }))
    }
    useEffect(() => {
        fetchUserData();
    }, [])
    return (
        <div className='flex flex-col justify-center items-center'>
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
            
            <div className="flex flex-col items-center justify-center p-10 gap-5 w-3/4 max-w-sm bg-[#20242A] bg-opacity-75">
                <div className='flex flex-col items-start justify-start font-bold'>Login</div>
                <form className="flex flex-col items-center justify-center p-5 gap-5 max-w-sm" onSubmit={handleLogin}>
                    <div className="w-full flex items-center justify-between p-2">
                        <label htmlFor="email" className="font-bold">Email:</label>
                        <input
                            id="email"
                            type="email"
                            className="p-2  border border-t-emerald-200 bg-transparent"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full flex items-center gap-2 justify-between p-2">
                        <label htmlFor="password" className="font-bold">Password:</label>
                        <input
                            id="password"
                            type="password"
                            className="p-2  border border-t-emerald-200 bg-transparent"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#282843] p-3 rounded-xl px-10 hover:bg-black"
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
                <p className='text-sm text-gray-200 text-center'>- Or continue with -</p>
                <div className="flex items-center justify-center ">
                    <button className="flex items-center bg-[#0f0f11]  border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800  hover:bg-black " onClick={goggleLogin}>
                        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
                        <span>Sign in with Google</span>
                    </button>
                </div>
                <p className='text-center  gap-4'>
                    Dont have an account? <Link to="/signup" className=' hover:text-blue-200 hover:underline'>Register Here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
