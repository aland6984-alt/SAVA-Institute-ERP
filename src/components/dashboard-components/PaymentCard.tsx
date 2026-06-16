'use client';

import { formatCurrency } from '@/utils/helpers';

interface PaymentCardProps {
  payments: any[];
}

export default function PaymentCard({ payments }: PaymentCardProps) {
  const totalPayable = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments.reduce((sum, p) => sum + p.paid_amount, 0);
  const remaining = totalPayable - totalPaid;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Payment Status</h2>
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
          <p className="text-xs text-gray-600 dark:text-gray-400">Total Payable</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(totalPayable)}
          </p>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
          <p className="text-xs text-gray-600 dark:text-gray-400">Paid</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(totalPaid)}
          </p>
        </div>
        <div className={`p-3 rounded ${
          remaining > 0
            ? 'bg-red-50 dark:bg-red-900/20'
            : 'bg-green-50 dark:bg-green-900/20'
        }`}>
          <p className="text-xs text-gray-600 dark:text-gray-400">Remaining Balance</p>
          <p className={`text-2xl font-bold ${
            remaining > 0
              ? 'text-red-600 dark:text-red-400'
              : 'text-green-600 dark:text-green-400'
          }`}>
            {formatCurrency(remaining)}
          </p>
        </div>
      </div>
    </div>
  );
}
