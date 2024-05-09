"use client";
import React, { useState, FormEvent } from "react";

export default function EmailForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Reset error message state

    if (!validateEmail(email)) {
      setErrorMessage("Enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/add-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Handle response
      const data = await response.json();
      setSuccessMessage("Thank you for subscribing to the blog!");
      setEmail("");
    } catch (error) {
      // Handle error
      console.error(error);
      setErrorMessage("An error occurred while subscribing.");
    } finally {
      setIsLoading(false); // Set loading to false when the request completes
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="mb-2 relative">
        <div className="flex items-center border border-zinc-600 rounded-lg overflow-hidden">
          <input
            type="email"
            placeholder="Enter Email Address..."
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow p-2 bg-transparent text-zinc-100 focus:outline-none w-full"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-zinc-800 bg-zinc-100 hover:bg-zinc-500 focus:outline-none rounded-r-lg"
          >
            {isLoading ? "Loading..." : "Subscribe"}
          </button>
        </div>
        {successMessage && (
          <p className="text-green-500 text-sm mt-2">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
