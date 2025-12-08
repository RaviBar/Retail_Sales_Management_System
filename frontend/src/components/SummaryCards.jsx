import { useSales } from '../context/SalesContext';
import { formatCurrency } from '../utils/formatters';

const SummaryCards = () => {
  const { sales, total } = useSales();

  const totalUnits = sales.reduce((sum, sale) => sum + (parseInt(sale.quantity) || 0), 0);
  const totalAmount = sales.reduce((sum, sale) => sum + (parseFloat(sale.finalAmount) || 0), 0);
  const totalDiscount = sales.reduce((sum, sale) => {
    const discount = (parseFloat(sale.pricePerUnit) || 0) * (parseInt(sale.quantity) || 0) - (parseFloat(sale.finalAmount) || 0);
    return sum + Math.max(0, discount);
  }, 0);

  // Calculate SRs (assuming SR = Sales Record, which is the total count of sales)
  const salesRecords = total || sales.length;

  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total units sold</p>
            <p className="text-2xl font-semibold text-gray-900">{totalUnits}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(totalAmount)} ({salesRecords} SRs)
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Discount</p>
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(totalDiscount)} ({salesRecords} SRs)
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;

