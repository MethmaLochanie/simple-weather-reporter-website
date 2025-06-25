import { useRef } from 'react';

// Global cache for tracking ongoing API requests
const ongoingRequests = new Map<string, Promise<any>>();

export const useApiDeduplication = () => {
  const requestIdRef = useRef<string>('');

  const deduplicateRequest = <T>(
    requestKey: string,
    requestFn: () => Promise<T>
  ): Promise<T> => {
    // Check if there's already an ongoing request for this key
    const ongoingRequest = ongoingRequests.get(requestKey);
    if (ongoingRequest) {
      return ongoingRequest;
    }

    // Create new request
    const newRequest = requestFn().finally(() => {
      // Clean up the request from the cache when it completes
      ongoingRequests.delete(requestKey);
    });

    // Store the request in the cache
    ongoingRequests.set(requestKey, newRequest);

    return newRequest;
  };

  const clearRequest = (requestKey: string) => {
    ongoingRequests.delete(requestKey);
  };

  return {
    deduplicateRequest,
    clearRequest,
  };
}; 