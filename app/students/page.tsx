"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Student {
  id: number;
  name: string;
  grade: string;
  email: string;
  subject_scores: Record<string, number>;
}
export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/students");
      const data = await response.json();
      setStudents(data);
    };

    fetchStudents();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50">
        <nav className="mb-4 flex justify-between text-blue-500 gap-10">
            <Link href="/" className="hover:underline">
                Home
            </Link>
            <Link href="/teachers" className="hover:underline">
                Back to Teachers            
            </Link>
        </nav>
      <h1 className="text-3xl font-bold text-center mb-8">
        Students Directory
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">{student.name}</h2>
            <p className="text-gray-600">{student.grade}</p>
            <p className="text-gray-600">{student.email}</p>
            {Object.entries(student.subject_scores).map(([subject, score]) => (
              <p className="text-gray-600" key ={subject}>
                {subject}: {score}
              </p>
            ))}{" "}
            <Link href={`/students/${student.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
