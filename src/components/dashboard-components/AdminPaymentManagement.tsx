'use client';

import { useState } from 'react';
import { formatCurrency } from '@/utils/helpers';

export default function AdminPaymentManagement() {
  const [payments, setPayments] = useState([]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by student..."
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sava-primary"
        />
        <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sava-primary">
          <option>All Status</option>
          <option>Paid</option>
          <option>Unpaid</option>
          <option>Partially Paid</option>
        </select>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Total Collected</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">$45,000</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Pending</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">$12,500</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Collection Rate</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">78%</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Student</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Total Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Paid</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Remaining</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No payments to display
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
