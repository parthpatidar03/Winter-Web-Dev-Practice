import { useState, useEffect } from 'preact/hooks'
import { useLocation } from 'wouter'
import axios from 'axios'

export function DeleteUser({ params }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [, setLocation] = useLocation()
  const id = params.id

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`)
        setUser(response.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`)
      setDeleting(false)
      setLocation('/') // Redirect to home
    } catch (err) {
      setDeleting(false)
      setError(err.message)
    }
  }

  if (loading) return <div className="container">Loading...</div>
  if (error) return <div className="container">Error: {error}</div>
  if (!user) return <div className="container">User not found</div>

  return (
    <div className="container">
      <div className="max-w-lg bg-white p-8 rounded shadow mx-auto mt-10 border-red-200 border-2">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Delete User?</h1>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete user <strong>{user.name}</strong> (ID: {user.id})? 
          This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => setLocation(`/users/${id}`)}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
