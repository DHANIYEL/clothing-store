import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "react-feather";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Alert from "../components/Alert";
import Loader from '../components/Loader';
import axios from 'axios';

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
	e.preventDefault();
	setError(null);
	setSuccess(null);
  
	if (password.length < 6) {
	  setError("Password must be at least 6 characters");
	  return;
	}
	if (password !== confirmPassword) {
	  setError("Passwords don't match");
	  return;
	}
	if (!username || !firstName || !lastName || !email) {
	  setError("Please fill all the fields");
	  return;
	}
  
	setLoading(true);
  
	try {
	  const resp = await axios({
		method: 'POST',
		baseURL: 'http://localhost:5000/api/auth/',
		url: 'signup',
		data: {
		  username,
		  firstName,
		  lastName,
		  email,
		  password,
		  passwordAgain: confirmPassword, // Send the passwordAgain as well
		},
		headers: {
		  'Content-Type': 'application/json',
		},
	  });
  
	//   console.log("Response from server:", resp);
  
	  setLoading(false);
  
	  // Check if response has status code 201 or if the response data indicates success
	  if (resp.status === 201 || resp.data.status === "success") {
		setSuccess("Registration successful! Redirecting to login...");
		setTimeout(() => {
		  navigate("/login"); // Redirect to login page after 2 seconds
		}, 2000);
	  } else {
		setError(resp.data.message || "Registration failed");
	  }
	} catch (err) {
	  console.error("Error during submission:", err);
	  setError(err.response?.data?.error || "Unexpected error occurred");
	  setLoading(false);
	}
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex items-center flex-col space-y-2">
      <Input
        value={username}
        icon={<User width={20} height={20} />}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
        required
      />
      <Input
        value={firstName}
        icon={<User width={20} height={20} />}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        placeholder="First Name"
        required
      />
      <Input
        value={lastName}
        icon={<User width={20} height={20} />}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        placeholder="Last Name"
        required
      />
      <Input
        value={email}
        icon={<Mail width={20} height={20} />}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        required
      />
      <Input
        value={password}
        icon={<Lock width={20} height={20} />}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
      />
      <Input
        value={confirmPassword}
        icon={<Lock width={20} height={20} />}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        placeholder="Confirm Password"
        required
      />

      {error && <Alert heading="Error!" body={error} danger />}
      {success && <Alert heading="Success!" body={success} success />}

      <Button className="w-full !mt-6 !text-base !rounded-full" type="submit" disabled={loading}>
        {loading ? <Loader /> : "Register"}
      </Button>

      <Link to="/login">
        <Button link>Already have an account?</Button>
      </Link>
    </form>
  );
}
