import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">School Management System</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/teachers">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Teachers Directory</h2>
              <p className="text-gray-600">View and manage all teachers in the system</p>
            </div>
          </Link>
          
          <Link href="/students">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">Students Directory</h2>
              <p className="text-gray-600">View and manage all students in the system</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}