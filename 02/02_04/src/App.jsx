import React, { useEffect, useState, useMemo } from 'react';

function UserProfile({ first, last, theme }) {
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);


  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    };

    fetchData(); // no error handling!

    localStorage.setItem('theme', theme);
    document.title = `You clicked ${count} times`;
    setProfile(data);
  }, [count, theme]);



  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Hello, {fullName}!</h1>
      <button onClick={() => setClickCount((c) => c + 1)}>
        Clicked {clickCount} times
      </button>
      {profile && (
        <div>
          <p>Email: {profile.email}</p>
          <p>Bio: {profile.bio}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
