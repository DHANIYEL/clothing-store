import React from 'react';
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
import clsx from "clsx"

// import CheckoutForm from "./CheckoutForm"
import PageHeader from './PageHeader';
import Button from "./Button"

// const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY;
// const stripePromise = loadStripe(STRIPE_PUB_KEY);

export default function CheckoutModal({ onCancel, onSuccess }) {
  return (
    <div className={clsx(
      "fixed inset-0 z-40 overflow-auto",
      "flex justify-center items-center",
      "w-screen h-screen bg-black/40",
    )}>
      <div className={clsx(
        "relative w-full max-w-md",
        "p-4 m-auto rounded-lg shadow-lg",
        "bg-gray-200 text-gray-800/80",
      )}>
        <PageHeader h3>Checkout</PageHeader>
        <hr className="w-full border-1 rounded-full border-gray-500/10 my-3" />
        <section className="flex flex-col">
          {/* Commented out the Stripe Elements wrapper */}
          {/* 
          <Elements stripe={stripePromise}>
            <CheckoutForm onCancel={onCancel} onSuccess={onSuccess} />
          </Elements>
          */}
          <div className="text-center">
            <p>Payment functionality is currently disabled.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
