"use client";
import { useState } from "react";
import PersonList from "./PersonList";
import "./globals.css";

export default function Home() {
  const API_URL = "https://randomuser.me/api/";
  const [people, setPeople] = useState<any[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);

  const fetchRandomPerson = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch person");
    const data = await response.json();
    return data.results[0];
  };

  const handleRandomize = async () => {
    try {
      const person = await fetchRandomPerson();
      setPeople(prev => [...prev, person]);
      setSelectedPerson(person);
      return person;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <div className="app">
      <h1>Random Person Generator</h1>
      <button 
        className="randomize-btn"
        onClick={async () => {
          window.dispatchEvent(new CustomEvent('randomizePerson'));
        }}
      >
        Randomize Person
      </button>

      <PersonList 
        onRandomize={handleRandomize}
        people={people}
        onSelectPerson={setSelectedPerson}
      />

      {selectedPerson && (
        <div className="selected-person">
          <h2>Currently Selected</h2>
          <div className="person-card">
            <img src={selectedPerson.picture.large} alt={`${selectedPerson.name.first}'s portrait`} />
            <h3>{selectedPerson.name.first} {selectedPerson.name.last}</h3>
            <p><strong>Email:</strong> {selectedPerson.email}</p>
            <p><strong>Location:</strong> {selectedPerson.location.city}, {selectedPerson.location.country}</p>
            <p><strong>Phone:</strong> {selectedPerson.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
}