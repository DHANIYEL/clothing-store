import React, { useEffect, useState } from 'react'

import { Link } from "react-router-dom"
import { User, Mail, Lock } from "react-feather"

import Input from "@/components/Input"
import Button from "@/components/Button"
import Alert from "../components/Alert"
import Loader from '../components/Loader'
import axios from 'axios';


export default function RegisterForm({ onSubmit }) {
	const [fullname, setFullname] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)


	const handleSubmit = async e => {
		e.preventDefault();
		if (password.length < 6) {
			setError("Password must be at least 6 characters");
			return;
		}
		if (password !== confirmPassword) {
			setError("Passwords don't match");
			return;
		}
		
		console.log("Form data:", { fullname, email, password, confirmPassword });
		setLoading(true);
		
		try {
			const resp = await axios.post('https://your-backend-url.com/endpoint', {
				fullname,
				email,
				password
			});
	
			console.log("Response from server:", resp.data); // Log server response for debugging
			setLoading(false);
	
			if (resp.data.status === "error") {
				setError(resp.data.message);
			} else {
				// Handle success case (e.g., redirect or show a success message)
			}
		} catch (err) {
			console.error("Error during submission:", err);
			setError("Unexpected error occurred");
			setLoading(false);
		}
	};
	
	
	useEffect(() => {
		return () => {
			setLoading(false)
		}
	}, [])

	return (
		<form 
			onSubmit={handleSubmit}
			className="flex items-center flex-col space-y-2"
			>
			<Input 
				value={fullname}
				icon={<User width={20} height={20} />}
				onChange={e => setFullname(e.target.value)}
				type="text" placeholder="Full Name" required />
			<Input 						
				value={email}
				icon={<Mail width={20} height={20} />}
				onChange={e => setEmail(e.target.value)}
				type="email" placeholder="Email" required />
			<Input 
				value={password}
				icon={<Lock width={20} height={20} />}
				onChange={e => setPassword(e.target.value)}
				type="password" placeholder="Password" required />
			<Input
				value={confirmPassword}
				icon={<Lock width={20} height={20} />}
				onChange={e => setConfirmPassword(e.target.value)} 
				type="password" placeholder="Confirm Password" required />
			
			{error && <Alert heading="Error!" body={error} danger />}

			<Button 
				className="w-full !mt-6 !text-base !rounded-full" 
				type="submit"
				disabled={loading}
			>
				{loading ? <Loader /> : "Register"}
			</Button>
			
			<Link to="/login">
				<Button link>
					Already have an account?
				</Button>
			</Link>
		</form>
	)
}