import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';
import Button from '../components/Button';
import { getFlat,updateListing } from '../api';

function UpdatePage() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFlat = async () => {
          const { data } = await getFlat(id);
          setName(data.name || '');
            setPrice(data.price || '');
            setLocation(data.location || '');
            setCapacity(data.capacity || '');
            setDescription(data.description || '');
  
         
        };
    
        fetchFlat();
      }, [id]);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = {
        name,
        price,
        location,
        description,
        capacity,
      };
  
      try {
        await updateListing(id,formData, {
          headers: {
            'Content-Type': 'application/json',
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
      <h1 className="text-3xl font-bold my-4">Update Listing</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block">Flat Name</label>
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
          <label htmlFor="description" className="block ">Flat Description</label>
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
          <label htmlFor="price" className="block ">Price</label>
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
          <label htmlFor="location" className="block ">Location</label>
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
          <label htmlFor="capacity" className="block">Guests Allowed</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <Button type="submit" name={"Update Flat Details"}/>
      </form>
    </div>
  )
}

export default UpdatePage
