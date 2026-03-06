// import React from "react";
// import { HiOutlineDocumentSearch, HiOutlineExclamationCircle } from "react-icons/hi";

// export default function ReportTable({ data, onExportCSV, onExportPDF, hasGenerated, loading }) {
//   if (loading) {
//     return (
//       <div className="bg-white p-12 rounded-xl shadow text-center border-2 border-dashed border-gray-100">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
//           <p className="text-gray-500 font-medium animate-pulse">Analyzing backend records...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!hasGenerated) {
//     return (
//       <div className="bg-white p-12 rounded-xl shadow text-center border-2 border-dashed border-gray-100">
//         <div className="flex flex-col items-center gap-2 text-gray-400">
//           <HiOutlineDocumentSearch size={48} />
//           <p className="text-sm font-medium">Select criteria and click Generate to see reports</p>
//         </div>
//       </div>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <div className="bg-white p-12 rounded-xl shadow text-center border-2 border-dashed border-gray-100">
//         <div className="flex flex-col items-center gap-2 text-red-400">
//           <HiOutlineExclamationCircle size={48} />
//           <p className="text-sm font-bold">No data found in this date range.</p>
//           <p className="text-xs text-gray-500">Try adjusting your "From" and "To" dates.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-4 rounded-xl shadow">
//       <table className="w-full text-sm border-collapse">
//         <thead>
//           <tr className="border-b">
//             <th className="py-2">Case ID</th>
//             <th>Applicant</th>
//             <th>Fraud Score</th>
//             <th>AML</th>
//             <th>Synthetic ID</th>
//             <th>Risk</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.map((row, index) => (
//             <tr key={`${row.id}-${row.name}-${index}`} className="border-b">
//               <td className="py-2">{row.id}</td>
//               <td>{row.name}</td>
//               <td>{row.fraud}%</td>
//               <td>{row.aml}</td>
//               <td>{row.synthetic}</td>

//               <td>
//                 <span
//                   className={
//                     row.fraud >= 75
//                       ? "text-red-600 font-semibold"
//                       : row.fraud >= 40
//                         ? "text-yellow-600 font-semibold"
//                         : "text-green-600 font-semibold"
//                   }
//                 >
//                   {row.fraud >= 75
//                     ? "High"
//                     : row.fraud >= 40
//                       ? "Medium"
//                       : "Low"}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Export Buttons */}
//       <div className="flex gap-3 mt-4">
//         <button
//           onClick={onExportCSV}
//           className="px-4 py-2 bg-gray-700 text-white rounded-lg"
//         >
//           Export CSV
//         </button>

//         <button
//           onClick={onExportPDF}
//           className="px-4 py-2 bg-red-600 text-white rounded-lg"
//         >
//           Export PDF
//         </button>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { HiOutlineDocumentSearch, HiOutlineExclamationCircle } from "react-icons/hi";

export default function ReportTable({ data, onExportCSV, onExportPDF, hasGenerated, loading }) {
  if (loading) {
    return (
      <div className="bg-white p-12 rounded-xl shadow text-center border-2 border-dashed border-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Analyzing backend records...</p>
        </div>
      </div>
    );
  }

  if (!hasGenerated) {
    return (
      <div className="bg-white p-12 rounded-xl shadow text-center border-2 border-dashed border-gray-100">
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <HiOutlineDocumentSearch size={48} />
          <p className="text-sm font-medium">Select criteria and click Generate to see reports</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl shadow text-center border-2 border-dashed border-gray-100">
        <div className="flex flex-col items-center gap-2 text-red-400">
          <HiOutlineExclamationCircle size={48} />
          <p className="text-sm font-bold">No data found in this date range.</p>
          <p className="text-xs text-gray-500">Try adjusting your "From" and "To" dates.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse table-fixed">
          <colgroup>
            <col style={{ width: "13%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "14%" }} />
          </colgroup>
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-3 text-left font-bold text-gray-700">Case ID</th>
              <th className="py-3 px-3 text-left font-bold text-gray-700">Applicant</th>
              <th className="py-3 px-3 text-center font-bold text-gray-700">Fraud Score</th>
              <th className="py-3 px-3 text-center font-bold text-gray-700">AML</th>
              <th className="py-3 px-3 text-center font-bold text-gray-700">Synthetic ID</th>
              <th className="py-3 px-3 text-center font-bold text-gray-700">Risk</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={`${row.id}-${row.name}-${index}`} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3 text-left">{row.id}</td>
                <td className="py-2 px-3 text-left">{row.name}</td>
                <td className="py-2 px-3 text-center">{row.fraud}%</td>
                <td className="py-2 px-3 text-center">{row.aml}</td>
                <td className="py-2 px-3 text-center">{row.synthetic}</td>
                <td className="py-2 px-3 text-center">
                  <span
                    className={
                      row.fraud >= 75
                        ? "text-red-600 font-semibold"
                        : row.fraud >= 40
                          ? "text-yellow-600 font-semibold"
                          : "text-green-600 font-semibold"
                    }
                  >
                    {row.fraud >= 75 ? "High" : row.fraud >= 40 ? "Medium" : "Low"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-3 mt-4">
        <button onClick={onExportCSV} className="px-4 py-2 bg-gray-700 text-white rounded-lg">
          Export CSV
        </button>
        <button onClick={onExportPDF} className="px-4 py-2 bg-red-600 text-white rounded-lg">
          Export PDF
        </button>
      </div>
    </div>
  );
}