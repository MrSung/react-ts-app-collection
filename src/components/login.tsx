import React from 'react'

export interface ILoginProps {
  setUser: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const Login = ({ setUser }: ILoginProps) => {
  const [username, setUsername] = React.useState('')

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    setUser(username)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={ev => setUsername(ev.target.value)}
          placeholder='Input username'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
