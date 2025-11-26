import { useState, useEffect } from 'preact/hooks'
import { Link } from 'wouter'
import axios from 'axios'

export function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users')
        setUsers(response.data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) return <div className="container">Loading...</div>
  if (error) return <div className="container">Error: {error}</div>

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User List</h1>
        <Link href="/add-user">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            + Add User
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <Link key={user.id} href={`/users/${user.id}`}>
            <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow cursor-pointer bg-white">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600"><strong>ID:</strong> {user.id}</p>
              <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
