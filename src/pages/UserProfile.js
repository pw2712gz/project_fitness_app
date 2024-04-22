import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Rock from '../assets/images/Rock.png';
import Rock2 from '../assets/images/Rock2.png';
import Rock3 from '../assets/images/Rock3.png';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';

function UserProfile() {
  const { currentUser, logout } = useAuth();
  const initialUser = {
    name: 'Dwayne Johnson',
    gender: 'Male',
    age: 52,
    weight: 260,
    height: 72,
    goals: 'To maintain a muscular physique fit for Hollywood movies.',
    email: 'The.Rock@hollywood.com',
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [pic, setPic] = useState(Rock);
  const [beforePic, setBeforePic] = useState(Rock2);
  const [afterPic, setAfterPic] = useState(Rock3);

  const postDetails = (pics, type) => {
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = () => {
        switch (type) {
          case 'profile':
            setPic(reader.result);
            break;
          case 'before':
            setBeforePic(reader.result);
            break;
          case 'after':
            setAfterPic(reader.result);
            break;
          default:
            break;
        }
      };
      reader.readAsDataURL(pics);
    }
  };

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="user-profile">
      <div className="user-profile" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'Arial Black', fontWeight: 'bold', color: '#333', margin: '15px 0' }}>User
          Profile:
        </h1>
      </div>

      <div style={{ display: 'flex' }}>
        <img src={pic} alt="Profile" style={{ width: '300px', height: '350px', marginRight: '30px' }} />
        <Typography
          z-index="1"
          fontWeight={600}
          color="#FF2625"
          sx={{ opacity: '0.40', display: { lg: 'block', xs: 'none' }, fontSize: '100px' }}
        >
          - {isEditing ? (
            <textarea
              rows="5"
              cols="60"
              value={user.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
        ) : user.name} - <br /> Iron
          Alliance Member
        </Typography>
      </div>
      <p style={{ color: '#666', lineHeight: '1.5' }}>
        <strong>Age:</strong> {isEditing
          ? <input value={user.age} onChange={(e) => handleChange('age', e.target.value)} /> : user.age} years
        old <br />
        <strong>Weight:</strong> {isEditing ? (
          <input
            value={user.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
          />
        ) : user.weight} lbs <br />
        <strong>Height:</strong> {isEditing ? (
          <input
            value={user.height}
            onChange={(e) => handleChange('height', e.target.value)}
          />
        ) : user.height} in <br />
        <strong>Email:</strong> {isEditing
          ? (
            <textarea
              value={user.email}
              onChange={(e) => handleChange('email', e.target.value)}
              style={{ height: '50px' }}
            />
          ) : user.email} <br />
      </p>
      <br />
      <p style={{ color: '#999', fontSize: '30px', margin: '10px 0' }}>Fitness Goals: {isEditing
        ? (
          <textarea
            rows="5"
            cols="60"
            value={user.goals}
            onChange={(e) => handleChange('goals', e.target.value)}
          />
        ) : user.goals}
      </p>
      {isEditing ? (
        <div>
          <label>Change Profile Picture:</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => postDetails(e.target.files[0], 'profile')}
          />
          <br />
          <label>Change Before Photo:</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => postDetails(e.target.files[0], 'before')}
          />
          <br />
          <label>Change Most Recent Photo:</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => postDetails(e.target.files[0], 'after')}
          />
          <br />
          <button
            onClick={handleSave}
            style={{
              textDecoration: 'none',
              width: '200px',
              textAlign: 'center',
              background: '#FF2625',
              padding: '14px',
              fontSize: '22px',
              textTransform: 'none',
              color: 'white',
              borderRadius: '4px',
              marginRight: '40px',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >Save
          </button>
          <button
            onClick={handleCancel}
            style={{
              textDecoration: 'none',
              width: '200px',
              textAlign: 'center',
              background: '#FF2625',
              padding: '14px',
              fontSize: '22px',
              textTransform: 'none',
              color: 'white',
              borderRadius: '4px',
            }}
          >Cancel
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleEdit}
            style={{
              textDecoration: 'none',
              width: '200px',
              textAlign: 'center',
              background: '#FF2625',
              padding: '14px',
              fontSize: '22px',
              textTransform: 'none',
              color: 'white',
              borderRadius: '4px',
              marginRight: '40px',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >Edit Profile
          </button>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>Before Photo</Typography>
          <img
            src={beforePic}
            alt="Before Picture"
            style={{ width: '400px', height: '450px', marginBottom: '20px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '30px' }}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>Most Recent Photo</Typography>
          <img
            src={afterPic}
            alt="Latest Picture"
            style={{ width: '400px', height: '450px', marginBottom: '20px' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          onClick={handleLogout}
          style={{
            textDecoration: 'none',
            width: '200px',
            textAlign: 'center',
            background: '#FF2625',
            padding: '14px',
            fontSize: '22px',
            textTransform: 'none',
            color: 'white',
            borderRadius: '4px',
          }}
        >Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
