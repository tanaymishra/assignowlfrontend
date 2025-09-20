import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      
      <nav className="space-y-2">
        <Link 
          href="/dashboard" 
          className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Dashboard
        </Link>
        <Link 
          href="/profile" 
          className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Profile
        </Link>
        <Link 
          href="/settings" 
          className="block px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Settings
        </Link>
      </nav>
      
      <div className="mt-auto pt-8">
        <button className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors">
          Logout
        </button>
      </div>
    </aside>
  )
}