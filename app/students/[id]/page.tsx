"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Params {
  id: string;
}

interface Student {
  id: number;
  name: string;
  grade: string;
  email: string;
  subject_scores: Record<string, number>;
}

export default function StudentDetailsPage({ params }: { params: Params }) {
  const studentId = parseInt(params.id);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudentDetails() {
      try {
        const response = await fetch("/api/students");
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const allStudents = await response.json();
        const foundStudent: Student | undefined = allStudents.find(
          (s: Student) => s.id === studentId
        );

        if (!foundStudent) {
          throw new Error("Student not found");
        }

        setStudent(foundStudent);
        setLoading(false);
      } catch (err) {
        // setError(err.message);
        setLoading(false);
      }
    }

    fetchStudentDetails();
  }, [studentId]);

  if (loading) return <div className="p-4">Loading student details...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!student) return <div className="p-4">Student not found</div>;

  return (
    <div className="p-6">
      <div className="mb-4 flex gap-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <Link href="/students" className="text-blue-500 hover:underline">
          Back to Students
        </Link>
      </div>

      <div className="mb-8 p-6 border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{student.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Student ID:</span> {student.id}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Grade:</span> {student.grade}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {student.email}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Subject Scores</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">Subject</th>
              <th className="py-2 px-4 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {student.subject_scores &&
              Object.entries(student.subject_scores).map(([subject, score]) => (
                <tr key={subject} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{subject}</td>
                  <td className="py-2 px-4">{score}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
