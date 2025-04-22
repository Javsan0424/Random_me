"use client";
import { useState, useEffect } from "react";
import "./globals.css";

interface Person {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
  location: {
    city: string;
    country: string;
  };
  phone: string;
}

interface PersonListProps {
  onRandomize: () => Promise<Person>;
  people: Person[];
  onSelectPerson: (person: Person) => void;
}

export default function PersonList({ onRandomize, people, onSelectPerson }: PersonListProps) {
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRandomize = async () => {
    try {
      setLoading(true);
      const person = await onRandomize();
      setCurrentPerson(person);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Add event listener for randomize button
    const listener = () => handleRandomize();
    window.addEventListener('randomizePerson', listener);
    return () => window.removeEventListener('randomizePerson', listener);
  }, []);

  return (
    <div className="person-container">
      <div className="person-list">
        <h3>Previous People</h3>
        <ul>
          {people.map((person, index) => (
            <li key={index} onClick={() => onSelectPerson(person)}>
              {person.name.first} {person.name.last}
            </li>
          ))}
        </ul>
      </div>

      <div className="person-display">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {currentPerson && (
          <div className="person-card">
            <img src={currentPerson.picture.large} alt={`${currentPerson.name.first}'s portrait`} />
            <h2>{currentPerson.name.first} {currentPerson.name.last}</h2>
            <p><strong>Email:</strong> {currentPerson.email}</p>
            <p><strong>Location:</strong> {currentPerson.location.city}, {currentPerson.location.country}</p>
            <p><strong>Phone:</strong> {currentPerson.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}