import { useState } from 'preact/hooks'
import { useLocation } from 'wouter'
import axios from 'axios'

export function AddUser() { // JavaScript function that returns HTML
    // NOTE: ⚠️⚠️⚠️
    // It must start with a Capital Letter (AddUser, not addUser). 
    // This tells React "Treat me as a custom tag <AddUser />, not a regular HTML tag like <div>".
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [, setLocation] = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault() /// Prevent form default submission, since we do not want to reload the page. 
    setLoading(true)
    setError(null)

    try {
      await axios.post('http://localhost:3000/api/users', { name, email, role })
      setLoading(false)
      setLocation('/') // Redirect to home
    } catch (err) {
      setLoading(false)
      setError(err.message)
    }
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Add New User</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="max-w-lg bg-white p-8 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)} // this line does the job of updating name state instead of the previous line
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            type="text"
            placeholder="Enter role (e.g. Admin, User)"
            value={role}
            onInput={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Add User'}
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            type="button"
            onClick={() => setLocation('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

