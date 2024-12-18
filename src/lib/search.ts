// Simulated search function
export const fetchSearchResults = async (query: string): Promise<string[]> => {
    // Simulate a delay (e.g., database or API call)
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    // Simulated search results
    return query
      ? [`Result 1 for "${query}"`, `Result 2 for "${query}"`, `Result 3 for "${query}"`]
      : [];
  };
  