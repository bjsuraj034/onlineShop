import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { backendURL, token, setToken, navigate } = useContext(ShopContext);
  const [currentState, setcurrentState] = useState('Login');
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setformData({
      name: '',
      email: '',
      password: ''
    });
    try {
      if (currentState === 'Login') {
        const response = await axios.post(backendURL + '/api/user/login', formData);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendURL + '/api/user/register', formData);
        if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Use useEffect outside of formHandler to redirect if token exists
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={formHandler}
      className="flex flex-col item-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-1 mb-2 mt-10 ">
        <p className="font-serif text-3xl ">{currentState}</p>
        <hr className="w-8 h-[2px] border-none bg-gray-500" />
      </div>

      {currentState === 'Login' ? '' : (
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="px-2 py-2 outline-none border border-gray-600"
          type="text"
          placeholder="Name"
          required
        />
      )}
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="px-2 py-2 outline-none border border-gray-600"
        type="email"
        placeholder="Email"
        required
      />
      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="px-2 py-2 outline-none border border-gray-600"
        type="password"
        placeholder="Password"
        required
      />
      <div className="flex items-center justify-between">
        <p>Forget password?</p>
        {currentState === 'Login' ? (
          <p
            onClick={() => {
              setcurrentState('Signup');
            }}
            className="cursor-pointer"
          >
            Create new account?
          </p>
        ) : (
          <p
            onClick={() => {
              setcurrentState('Login');
            }}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button type="submit" className="bg-black px-5 py-2 text-white m-auto rounded-xl">
        {currentState === 'Login' ? 'Login' : 'Signup'}
      </button>
    </form>
  );
};

export default Login;
