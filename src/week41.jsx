import React, { useState } from 'react';

const RetrieveInformation = () => {
  const [aadharQuery, setAadharQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setAadharQuery(e.target.value);
  };

  const retrieveInformation = () => {
    const storedPersons = JSON.parse(localStorage.getItem('persons'));
    if (storedPersons) {
      const foundPerson = storedPersons.find(person => person.aadhar === aadharQuery);
      setResult(foundPerson || 'No match found');
    } else {
      setResult('No match found');
    }
  };

  return (
    <div>
      <h2>Retrieve Information</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Aadhar Number"
          value={aadharQuery}
          onChange={handleInputChange}
        />
        <button onClick={retrieveInformation}>Retrieve</button>
      </div>
      {result && (
        typeof result === 'string' ? (
          <p>{result}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Aadhar Number</th>
                <th>Mobile Number</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.name}</td>
                <td>{result.dob}</td>
                <td>{result.aadhar}</td>
                <td>{result.mobile}</td>
                <td>{result.age}</td>
              </tr>
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default RetrieveInformation; 