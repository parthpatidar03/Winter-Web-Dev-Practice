import { useState, useEffect } from 'preact/hooks'
import { useLocation } from 'wouter'
import axios from 'axios'

export function EditUser({ params }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [, setLocation] = useLocation()
  const id = params.id

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`)
        const user = response.data
        setName(user.name)
        setEmail(user.email)
        setRole(user.role || 'User')
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      await axios.patch(`http://localhost:3000/api/users/${id}`, { name, email, role })
      setSaving(false)
      setLocation(`/users/${id}`) // Redirect back to detail page
    } catch (err) {
      setSaving(false)
      setError(err.message)
    }
  }

  if (loading) return <div className="container">Loading...</div>
  if (error) return <div className="container">Error: {error}</div>

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Edit User</h1>
      
      <form onSubmit={handleSubmit} className="max-w-lg bg-white p-8 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onInput={(e) => setName(e.target.value)}
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
            value={role}
            onInput={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            type="submit"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            type="button"
            onClick={() => setLocation(`/users/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}