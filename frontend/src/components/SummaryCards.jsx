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
  const cardStyle = "bg-white rounded-lg shadow-sm border border-gray-200 px-4 h-[62px] flex items-center gap-4 min-w-fit whitespace-nowrap";
  return (
    <div className="flex gap-[10px] mb-6">
      <div className={cardStyle}>
          <div>
            <p className="text-sm text-[#0D141C] mt-1 mb-1">Total units sold</p>
            <p className="text-[14px] font-bold text-gray-900">{totalUnits}</p>
          </div>
          <div className="w-8 h-8 mt-[-5px] rounded-full flex">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
      </div>

      <div className={cardStyle}>
          <div>
            <p className="text-sm text-[#0D141C] mt-1 mb-1">Total Amount</p>
            <p className="text-[14px] font-bold text-gray-900">
              {formatCurrency(totalAmount)} ({salesRecords} SRs)
            </p>
          </div>
          <div className="w-8 h-8 mt-[-5px]  rounded-full flex">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
      </div>

      <div className={cardStyle}>
          <div>
            <p className="text-sm text-[#0D141C] mt-1 mb-1">Total Discount</p>
            <p className="text-[14px] font-bold text-gray-900">
              {formatCurrency(totalDiscount)} ({salesRecords} SRs)
            </p>
          </div>
          <div className="w-8 h-8 rounded-full flex">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
      </div>
    </div>
  );
};

export default SummaryCards;

