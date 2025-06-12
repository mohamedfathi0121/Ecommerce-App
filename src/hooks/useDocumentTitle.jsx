import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | Shopco`;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};