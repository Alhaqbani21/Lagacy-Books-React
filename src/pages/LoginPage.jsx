import React, { useState, useEffect } from 'react';
import bgImage from '../assets/bgImageLogin.png';
import logo from '../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [emailvalue, setEmailvalue] = useState('');
  const [passwordvalue, setPasswordvalue] = useState('');
  const [errors, setErrors] = useState({});
  const urlUsers =
    'https://667ba97dbd627f0dcc9358df.mockapi.io/LagacyBookstore';
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const validate = () => {
    const errors = {};

    // Email validation
    if (!emailvalue) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(emailvalue)) {
      errors.email = 'Email is invalid';
    }

    // Password validation
    if (!passwordvalue) {
      errors.password = 'Password is required';
    } else if (passwordvalue.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    return errors;
  };

  function fetchData() {
    axios.get(urlUsers).then((response) => {
      setData(response.data);
    });
  }
  const loginData = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      fetchData();
      const dataFound = data.find((e) => {
        return e.email === emailvalue && e.password === passwordvalue;
      });

      if (dataFound) {
        console.log('User found:', dataFound);
        navigate('../');
        localStorage.setItem('userId', dataFound.id);
      } else {
        setErrors({ email: 'Wrong email', password: 'Wrong password' });
      }
    }
  };

  return (
    <>
      <div className="bg-[#D5C7B9] flex justify-center items-center h-screen">
        <div className="flex w-3/4 shadow-2xl rounded-lg overflow-hidden bg-[#383942]">
          <div
            className="hidden bg-cover lg:block lg:w-2/4"
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          >
            <div className="flex items-center h-full px-20 bg-[#383942] bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">
                  Lagacy Bookstore
                </h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/4 p-10">
            <div className="flex-1">
              <div className="text-center flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  <img className="w-20 my-2" src={logo} alt="" />
                </div>
                <p className="mt-3 text-gray-300">Sign In</p>
              </div>

              <div className="mt-8">
                <form>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-200"
                    >
                      Email Address
                    </label>
                    <input
                      onChange={(e) => {
                        setEmailvalue(e.target.value);
                      }}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      className="block text-lg w-full px-4 py-2 mt-2 placeholder-gray-800 border rounded-md bg-[#8A8D99] text-black border-gray-700"
                    />
                    {errors.email && (
                      <p className="text-red-500 leading-none">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-200"
                      >
                        Password
                      </label>
                    </div>

                    <input
                      onChange={(e) => {
                        setPasswordvalue(e.target.value);
                      }}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="block text-lg w-full px-4 py-2 mt-2 placeholder-gray-800 border rounded-md bg-[#8A8D99] text-black border-gray-700"
                    />
                    {errors.password && (
                      <p className="text-red-500 leading-none">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={loginData}
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-[#D5C7B9] hover:text-black"
                    >
                      Sign In
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-white">
                  Don&#x27;t have an account yet?{' '}
                  <Link
                    to={'../SignUp'}
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </div>
              <button
                onClick={() => {
                  navigate('../');
                }}
                className="w-[50%] my-5 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-[#D5C7B9] hover:text-black"
              >
                Home Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
