import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFlatPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('capacity', capacity);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/flats', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Add Flat</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Flat Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Flat Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">Location</label>
          <select
                  id="location"
                  value={location}
                  onChange={(e)=>setLocation(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Agra">Agra</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="NewDelhi">New Delhi</option>
                  <option value="Banglore">Banglore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Mathura">Mathura</option>
                  <option value="Varanasi">Varanasi</option>
                  <option value="Shimla">Shimla</option>
                  <option value="Noida">Noida</option>
                </select>
        </div>
        <div className="mb-4">
          <label htmlFor="capacity" className="block text-gray-700">Guests Allowed</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Add Flat</button>
      </form>
    </div>
  );
};

export default AddFlatPage;
