export const fetchLivePrice = async (symbol) => {
    const response = await fetch(`https://marketdata.tradermade.com/api/v1/live?currency=${symbol}&api_key=your_dummy_key`);
    const data = await response.json();
    return data.quotes[0].bid;
};

// src/data/DataFetcher.js
export const fetchSymbols = async () => {
  try {
    const response = await fetch(`https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=CBEq2UudJ_6_DP0T9OjO`);
    const data = await response.json();
    const available = data?.available_currencies;

    // Convert object to array: { EUR: "Euro", GBP: "British Pound", ... } → [ { symbol: "EURUSD", description: "Euro" }, ... ]
    const formatted = Object.entries(available).map(([code, name]) => ({
      symbol: `${code}USD`,       // Only combine as per examples EURUSD, GBPUSD
      description: `${name}`,     // Only the original name, no extra text
    }));

    return formatted;
  } catch (error) {
    console.error('Error fetching symbols:', error);
    return [];
  }
};