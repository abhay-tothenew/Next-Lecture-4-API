"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<
    {
      id: number;
      name: string;
      subject: string;
      email: string;
      students?: any[];
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await fetch("/api/teachers");
        if (!response.ok) {
          throw new Error("Failed to fetch teachers");
        }
        const data = await response.json();
        setTeachers(data);
        setLoading(false);
      } catch (err) {
        // setError(err.message);
        setLoading(false);
      }
    }

    fetchTeachers();
  }, []);

  if (loading) return <div className="p-4">Loading teachers...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Teachers Directory</h1>

      <div className="mb-4 flex gap-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <Link href="/students" className="text-blue-500 hover:underline">
          View All Students
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold">{teacher.name}</h2>
            <p className="text-gray-600">Subject: {teacher.subject}</p>
            <p className="text-gray-600">Email: {teacher.email}</p>
            <p className="text-gray-600">
              Students: {teacher.students?.length || 0}
            </p>
            <div className="mt-4">
              <Link
                href={`/teachers/${teacher.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
