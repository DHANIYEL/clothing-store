import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Mail, Lock } from "react-feather";
import Loader from '../components/Loader';
import axios from 'axios';

import Input from "@/components/Input";
import Button from "@/components/Button";
import Alert from "@/components/Alert";

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Added success state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");  // Reset success message before submission

    // Simple validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      // Send POST request to login API
      const resp = await axios({
        method: 'POST',
        baseURL: 'http://localhost:5000/api/auth/',
        url: 'login',
        data: {
          email,
          password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response from server:", resp);

      setLoading(false);

      // If the response indicates a successful login
      if (resp.status === 200 || resp.data.status === "success") {
        setSuccess("Login successful! Redirecting to your dashboard...");
        setTimeout(() => {
          // Assuming you're using react-router, navigate to the dashboard page
          window.location.href = "/dashboard"; // You can use `navigate("/dashboard")` if using react-router v6+
        }, 2000);
      } else {
        setError(resp.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError(err.response?.data?.error || "Unexpected error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <form
      className="flex items-center flex-col space-y-2"
      onSubmit={handleSubmit}
    >
      <Input 
        value={email}
        onChange={e => setEmail(e.target.value)}
        icon={<Mail width={20} height={20} />}
        type="email" placeholder="Email" required 
      />
      <Input 
        value={password}
        icon={<Lock width={20} height={20} />}
        onChange={e => setPassword(e.target.value)}
        type="password" placeholder="Password" required 
      />

      {/* Display error if present */}
      {error && <Alert heading="Error!" body={error} danger />}

      {/* Display success message if present */}
      {success && <Alert heading="Success!" body={success} success />}

      <Button 
        className="w-full !mt-6 !text-base !rounded-full" 
        type="submit"
        disabled={loading}
      >
        {loading ? <Loader /> : "Login"}
      </Button>
      
      <Link to="/register">
        <Button link>
          Create an account
        </Button>
      </Link>
    </form>
  );
}
