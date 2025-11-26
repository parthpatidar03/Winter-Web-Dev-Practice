import { useState, useEffect } from 'preact/hooks'
import { Link } from 'wouter'
import axios from 'axios'

export function UserDetail({ params }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const id = params.id

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`)
        setUser(response.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  if (loading) return <div className="container">Loading...</div>
  if (error) return <div className="container">Error: {error}</div>
  if (!user) return <div className="container">User not found</div>

  return (
    <div className="container">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Users</Link>
      <div className="border p-8 rounded shadow bg-white max-w-2xl">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <div className="space-x-2">
            <Link href={`/users/${user.id}/edit`}>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm">
                Edit
              </button>
            </Link>
            <Link href={`/users/${user.id}/delete`}>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm">
                Delete
              </button>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role || 'User'}</p>
          {/* Add more fields as available in your API */}
        </div>
      </div>
    </div>
  )
}
