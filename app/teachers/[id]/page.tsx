"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Params {
  id: string;
}

export default function TeacherDetailsPage({ params }: { params: Params }) {
  const teacherId = params.id;
  interface Teacher {
    id: number;
    name: string;
    subject: string;
    email: string;
    students?: number[];
  }

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  interface Student {
    id: number;
    name: string;
    grade: string;
    email: string;
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeacherAndStudents() {
      try {
        const teacherResponse = await fetch(`/api/teachers`);
        if (!teacherResponse.ok) {
          throw new Error("Failed to fetch teacher details");
        }
        const teachersData = await teacherResponse.json();
        const teacherData: Teacher | undefined = teachersData.find(
          (t: Teacher) => t.id === parseInt(teacherId)
        );

        if (!teacherData) {
          throw new Error("Teacher not found");
        }

        setTeacher(teacherData);

        const studentsResponse = await fetch(`/api/teachers/${teacherId}`);
        if (!studentsResponse.ok) {
          throw new Error("Failed to fetch students for this teacher");
        }
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);

        setLoading(false);
      } catch (err) {
        // setError(err.message);
        setLoading(false);
      }
    }

    fetchTeacherAndStudents();
  }, [teacherId]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!teacher) return <div className="p-4">Teacher not found</div>;

  return (
    <div className="p-6">
      <div className="mb-4 flex gap-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <Link href="/teachers" className="text-blue-500 hover:underline">
          Back to Teachers
        </Link>
      </div>

      <div className="mb-8 p-6 border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">{teacher.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Subject:</span> {teacher.subject}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {teacher.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Students:</span>{" "}
              {teacher.students?.length || 0}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Students</h2>

      {students.length === 0 ? (
        <p>No students assigned to this teacher.</p>
      ) : (
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
      )}
    </div>
  );
}
