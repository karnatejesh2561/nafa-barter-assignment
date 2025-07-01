/** Components */
import { useEffect, useState } from "react";
import { generateRandomPrice } from "./data/DataGenerator";
import ChartComponent from "./components/ChartComponent";
import FooterComponent from "./components/common/FooterComponent";
import Header from "./components/common/Header";
import { fetchSymbols } from "./data/DataFetcher";

/** Main Export */
function App() {

    const [data, setData] = useState([]);
    const [isRunning, setIsRunning] = useState(true);
    const [currentSymbol, setCurrentSymbol] = useState('');
    const [symbols, setSymbols] = useState([]);
    const [symbolDetails, setSymbolDetails] = useState({});

    console.log("symbolDetails", symbolDetails, currentSymbol)

    // Fetch symbols on mount
    useEffect(() => {
        const getSymbols = async () => {
            const fetchedSymbols = await fetchSymbols();

            if (fetchedSymbols.length === 0) {
                // Fallback if API fails
                const fallbackSymbols = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD'];
                setSymbols(fallbackSymbols);
                setSymbolDetails({
                    EURUSD: { name: 'Euro / US Dollar' },
                    GBPUSD: { name: 'British Pound / US Dollar' },
                    USDJPY: { name: 'US Dollar / Japanese Yen' },
                    AUDUSD: { name: 'Australian Dollar / US Dollar' },
                });
                setCurrentSymbol('EURUSD');
                return;
            }

            const symbolNames = fetchedSymbols.map(item => item.symbol);
            const symbolMap = {};
            fetchedSymbols.forEach(item => {
                symbolMap[item.symbol] = { name: item.description };
            });

            setSymbols(symbolNames);
            setSymbolDetails(symbolMap);
            setCurrentSymbol(symbolNames[0]); // Set the first symbol by default
        };

        getSymbols();
    }, []);

    // Simulated price generator
    useEffect(() => {
        let interval;
        if (isRunning && currentSymbol) {
            interval = setInterval(() => {
                const newPoint = {
                    time: new Date().toLocaleTimeString(),
                    price: generateRandomPrice()
                };
                setData(prev => [...prev.slice(-50), newPoint]);
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isRunning, currentSymbol]);

    const handlePause = () => setIsRunning(false);
    const handleResume = () => { if (currentSymbol) setIsRunning(true); };
    const handleClear = () => setData([]);
    const handleSwitchSymbol = (symbol) => {
        setCurrentSymbol(symbol);
        setData([]); // Clear data on symbol switch
        setIsRunning(false);
    };
    const handleToggle = () => { if (currentSymbol) setIsRunning(prev => !prev); };

    // Calculate current price and price change
    const currentPrice = data.length > 0 ? data[data.length - 1].price : 0;
    const previousPrice = data.length > 1 ? data[data.length - 2].price : 0;
    const priceChange = currentPrice - previousPrice;

    return (
        <div className="nf_app">
            {currentSymbol && (
                <>
                    <Header
                        symbol={currentSymbol}
                        currentPrice={currentPrice}
                        priceChange={priceChange}
                        isConnected={isRunning}
                    />
                    <ChartComponent chartData={data} />
                    <FooterComponent
                        isRunning={isRunning}
                        onPause={handlePause}
                        onResume={handleResume}
                        onClear={handleClear}
                        onSwitch={handleSwitchSymbol}
                        currentSymbol={currentSymbol}
                        onToggle={handleToggle}
                        dataPoints={data.length}
                        symbols={symbols}
                    />
                </>
            )}
        </div>
    );
}

export default App;