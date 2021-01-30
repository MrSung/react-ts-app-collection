import React from 'react'

export const Header = ({ user, setUser }) => (
  <div>
    Welcome, {user}!
    <button type='button' onClick={() => setUser('')}>
      Logout
    </button>
  </div>
)
