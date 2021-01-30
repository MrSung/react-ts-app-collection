import React from 'react'

export interface IHeaderProps {
  user: string | undefined
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const Header = ({ user, setUser }: IHeaderProps) => (
  <div>
    Welcome, {user}!
    <button type='button' onClick={() => setUser('')}>
      Logout
    </button>
  </div>
)
