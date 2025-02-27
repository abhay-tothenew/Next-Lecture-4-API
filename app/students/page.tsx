'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';



interface Student {
  id: number
  name: string
  grade: string
  email: string
  subject_scores: Record<string, number>
}

// interface Teacher {
//   id: number
//   name: string
//   subject: string
//   email: string
//   students?: number[]
// }
export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch('/api/students');
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        alert(err);
        setError("Failed to fetch students");
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  if (loading) return <div className="p-4">Loading students...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Students Directory</h1>
      
      <div className="mb-4 flex gap-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <Link href="/teachers" className="text-blue-500 hover:underline">
          View All Teachers
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Grade</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{student.id}</td>
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.grade}</td>
                <td className="py-2 px-4">{student.email}</td>
                <td className="py-2 px-4">
                  <Link 
                    href={`/students/${student.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}