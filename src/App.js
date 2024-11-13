import { useState } from "react";
import "./App.css";

export default function App() {
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState(null);

  // Function to calculate the age
  function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();

    // Adjust if the current month/day hasn't been reached yet
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }

    return { years, months, days };
  }

  // Handle form submission
  function handleBirthday(e) {
    e.preventDefault();
    const ageResult = calculateAge(birthday);
    setAge(ageResult);
  }

  //handle reset button
  function handleReset() {
    setBirthday("");
    setAge(null);
  }

  return (
    <>
      <form className="App" onSubmit={handleBirthday}>
        <h2>Age Calculator</h2>
        <input
          type="date"
          value={birthday}        
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <input type="submit" value="Calculate Age" />
        <button className="btn" type="button" onClick={handleReset}>
          Reset
        </button>y
      
        {age && <Age  years={age.years} months={age.months} days={age.days} /> }
      </form>
    </>
  );
}

function Age({ years, months, days }) {
  return (
    <h3 className="Age">
      You are {years} years, {months} months, and {days} days old.
    </h3>
  );
}
