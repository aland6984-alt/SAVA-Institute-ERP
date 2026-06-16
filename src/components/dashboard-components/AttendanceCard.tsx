'use client';

interface AttendanceCardProps {
  attendance: any[];
}

export default function AttendanceCard({ attendance }: AttendanceCardProps) {
  const presentCount = attendance.filter((a) => a.status === 'present').length;
  const absentCount = attendance.filter((a) => a.status === 'absent').length;
  const lateCount = attendance.filter((a) => a.status === 'late').length;
  const totalClasses = attendance.length;
  const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Attendance</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Attendance</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{attendancePercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${attendancePercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{presentCount}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Present</p>
          </div>
          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{absentCount}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Absent</p>
          </div>
          <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{lateCount}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Late</p>
          </div>
        </div>
      </div>
    </div>
  );
}
