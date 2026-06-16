'use client';

interface GradesCardProps {
  grades: any[];
}

export default function GradesCard({ grades }: GradesCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Academic Performance</h2>
      <div className="space-y-4">
        {grades.length > 0 ? (
          grades.map((grade: any) => (
            <div key={grade.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {grade.subjects?.name || 'Subject'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Exam: {grade.exam_type}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded font-bold">
                  {grade.score}/100
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">No grades available yet</p>
        )}
      </div>
    </div>
  );
}
