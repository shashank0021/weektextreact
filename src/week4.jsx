import React, { useState, useEffect } from 'react';

const PersonTable = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    dob: '',
    aadhar: '',
    mobile: '',
  });

  useEffect(() => {
    const storedPersons = JSON.parse(localStorage.getItem('persons'));
    if (storedPersons) {
      setPersons(storedPersons);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const addRow = () => {
    setPersons([...persons, { ...newPerson, age: calculateAge(newPerson.dob), saved: false }]);
    setNewPerson({
      name: '',
      dob: '',
      aadhar: '',
      mobile: '',
    });
  };

  const saveRow = (index) => {
    const updatedPersons = persons.map((person, i) =>
      i === index ? { ...person, saved: true } : person
    );
    setPersons(updatedPersons);
    localStorage.setItem('persons', JSON.stringify(updatedPersons));
  };

  const deleteRow = (index) => {
    const updatedPersons = persons.filter((_, i) => i !== index);
    setPersons(updatedPersons);
    localStorage.setItem('persons', JSON.stringify(updatedPersons));
  };

  const validateInputs = () => {
    const { name, dob, aadhar, mobile } = newPerson;
    return (
      name &&
      dob &&
      aadhar.length === 12 &&
      mobile.length === 10
    );
  };

  return (
    <div>
      <h1>Add New Person</h1>
      <fieldset>
        <legend>Person Details</legend>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Aadhar Number</th>
              <th>Mobile Number</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person, index) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.dob}</td>
                <td>{person.aadhar}</td>
                <td>{person.mobile}</td>
                <td>{person.age}</td>
                <td>
                  {!person.saved ? (
                    <button onClick={() => saveRow(index)}>Save</button>
                  ) : null}
                  <button onClick={() => deleteRow(index)}>Delete</button>
                </td>
              </tr>
            ))}
            <tr>
              <td><input type="text" name="name" value={newPerson.name} onChange={handleInputChange} /></td>
              <td><input type="date" name="dob" value={newPerson.dob} onChange={handleInputChange} /></td>
              <td><input type="text" name="aadhar" value={newPerson.aadhar} onChange={handleInputChange} /></td>
              <td><input type="text" name="mobile" value={newPerson.mobile} onChange={handleInputChange} /></td>
              <td>{newPerson.dob && calculateAge(newPerson.dob)}</td>
              <td><button onClick={addRow} disabled={!validateInputs()}>Add</button></td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </div>
  );
};

export default PersonTable;