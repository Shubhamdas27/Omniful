import { useState, useCallback } from 'react';

export interface Item {
  id: number;
  name: string;
  description: string;
}

export const useInfiniteScroll = (allItems: Item[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const items = allItems.slice(0, currentPage * itemsPerPage);
  const hasMore = items.length < allItems.length;

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Simulate async loading
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoading(false);
    }, 500);
  }, [loading, hasMore]);

  return {
    items,
    loading,
    hasMore,
    loadMore
  };
};
