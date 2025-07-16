import React, { useEffect, useRef, useCallback } from 'react';
import './InfiniteScroll.css';

interface InfiniteScrollProps<T> {
  items: T[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  renderItem: (item: T) => React.ReactNode;
  threshold?: number;
}

export const InfiniteScroll = <T,>({
  items,
  loading,
  hasMore,
  loadMore,
  renderItem,
  threshold = 100
}: InfiniteScrollProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        loadMore();
      }
    },
    [hasMore, loading, loadMore]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: `${threshold}px`
    });

    observerRef.current.observe(sentinel);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, threshold]);

  return (
    <div ref={containerRef} className="infinite-scroll">
      <div className="infinite-scroll-content">
        {items.map((item, index) => (
          <div key={index} className="infinite-scroll-item">
            {renderItem(item)}
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div ref={sentinelRef} className="infinite-scroll-sentinel">
          {loading && (
            <div className="infinite-scroll-loading">
              <div className="spinner"></div>
              <span>Loading more items...</span>
            </div>
          )}
        </div>
      )}
      
      {!hasMore && items.length > 0 && (
        <div className="infinite-scroll-end">
          <p>No more items to load</p>
        </div>
      )}
    </div>
  );
};
