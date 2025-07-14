export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          disabled={number === currentPage}
          className={`px-4 py-2 rounded-md ${number === currentPage
            ? 'bg-green-600 text-white'
            : 'bg-white text-green-600 border border-green-600 hover:bg-green-100'
            }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}