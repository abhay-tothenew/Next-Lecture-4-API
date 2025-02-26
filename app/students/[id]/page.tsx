import Link from 'next/link';
import styles from '../StudentDetails.module.css'; // Import CSS module

interface Student {
  id: number;
  name: string;
  grade: string;
  email: string;
  subject_scores: Record<string, number>;
}

export default async function StudentDetailsPage({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const studentId = parseInt(id);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students/${studentId}`);
    if (!response.ok) throw new Error('Student not found');

    const student: Student = await response.json();

    return (
      <div className="p-6 max-w-lg mx-auto">
        <nav className="mb-4 flex justify-between text-blue-500">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/students" className="hover:underline">Back to Students</Link>
        </nav>

        <div className="bg-white p-4 shadow rounded-lg text-center">
          <h1 className="text-xl font-semibold">Student Details</h1>
          <h1 className="text-xl font-semibold">{student.name}</h1>
          <p className='text-gray-600'><span className="font-semibold">Student ID: {student.id}</span></p>
          <p className="text-gray-600">{student.email}</p>
          <p className="text-gray-600">Grade: {student.grade}</p>
        </div>

        <h2 className="mt-6 text-lg font-semibold text-center">Subject Scores</h2>
        {Object.entries(student.subject_scores).map(([subject, score]) => (
          <div key={subject} className="bg-white p-4 shadow rounded-lg text-center">
            <p className="text-xl font-semibold">{subject}</p>
            <p className="text-gray-600">{score}</p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error loading student:', error);
    return <div className={styles.container}>Error</div>;
  }
}
