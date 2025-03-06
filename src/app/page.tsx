"use client";
import { useState, useEffect } from "react";
import "./globals.css";

export default function Home() {
  const API_URL = "https://randomuser.me";

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const Fetch_person = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const result = await response.json();
        setData(result);
        setError(null);
        alert("yeah")
      } else {
        throw new Error("Error fetching data");
      }
    } catch (bug) {
      setError(bug.message);
    }
  };

  useEffect(() => {
    Fetch_person();
  }, []);

  return (
    <div>
      <div className="main">
        {error && <p>Error: {error}</p>}
        {data ? (
          <div>
            <p>Name: {data[0].name.first} {data[0].name.last}</p>
            <p>Email: {data[0].email}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}