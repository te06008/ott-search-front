import { useState } from 'react';

function useSearchHistory() {
  const [histories, setHistories] = useState<Array<string>>(
    sessionStorage.getItem('movieHistory')
      ? (JSON.parse(sessionStorage.getItem('movieHistory')!) as string[]).slice(
          0,
          8,
        )
      : [],
  );

  const addHistory = (history: string) => {
    const newHistories = [history, ...histories];
    setHistories(newHistories);
    sessionStorage.setItem('movieHistory', JSON.stringify(newHistories));
  };

  const removeHistory = (index: number) => {
    const newHistories = histories.filter((_, key) => key !== index);
    setHistories(newHistories);
    sessionStorage.setItem('movieHistory', JSON.stringify(newHistories));
  };

  return [histories, addHistory, removeHistory] as [
    typeof histories,
    typeof addHistory,
    typeof removeHistory,
  ];
}

export default useSearchHistory;
