
import React from 'react';
import { QuizHistoryEntry, UIContent } from '../types';

interface HistoryListProps {
  history: QuizHistoryEntry[];
  ui: UIContent;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, ui }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-bold text-slate-800">{ui.historyTitle}</h3>
      </div>
      <div className="overflow-x-auto">
        {history.length === 0 ? (
          <div className="p-8 text-center text-slate-400 italic">
            {ui.noHistory}
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="text-xs uppercase text-slate-400 font-bold bg-slate-50/50">
              <tr>
                <th className="px-6 py-4">{ui.historyName}</th>
                <th className="px-6 py-4">{ui.historyKeyword}</th>
                <th className="px-6 py-4">{ui.historyScore}</th>
                <th className="px-6 py-4">{ui.historyDate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...history].reverse().map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{entry.userName}</td>
                  <td className="px-6 py-4">
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-sm font-bold">
                      {entry.keyword}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-black ${entry.score >= 8 ? 'text-green-600' : entry.score >= 5 ? 'text-orange-500' : 'text-red-500'}`}>
                      {entry.score}/10
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HistoryList;
