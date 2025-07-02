/** Components */
import { useEffect, useState } from "react";
import { generateRandomPrice } from "./data/DataGenerator";
import ChartComponent from "./components/ChartComponent";
import FooterComponent from "./components/common/FooterComponent";
import Header from "./components/common/Header";
import { fetchSymbols } from "./data/DataFetcher";

/** Main Export */
function App() {

    const [symbols, setSymbols] = useState([]);
    const [chartState, setChartState] = useState({
        isRunning: true,
        currentSymbol: '',
        data: []
    });

    // Fetch symbols on mount
    useEffect(() => {
        const getSymbols = async () => {
            const fetchedSymbols = await fetchSymbols();

            if (fetchedSymbols.length === 0) {
                const fallbackSymbols = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD'];
                setSymbols(fallbackSymbols);
                setChartState(prev => ({ ...prev, currentSymbol: 'EURUSD' }));
                return;
            }

            const symbolNames = fetchedSymbols.map(item => item.symbol);
            setSymbols(symbolNames);
            setChartState(prev => ({ ...prev, currentSymbol: symbolNames[0] }));
        };

        getSymbols();
    }, []);

    // Simulated price generator
    useEffect(() => {
        let interval;
        if (chartState.isRunning && chartState.currentSymbol) {
            interval = setInterval(() => {
                const newPoint = {
                    time: new Date().toLocaleTimeString(),
                    price: generateRandomPrice()
                };
                setChartState(prev => ({
                    ...prev,
                    data: [...prev.data.slice(-50), newPoint]
                }));
            }, 500);
        }
        return () => clearInterval(interval);
    }, [chartState.isRunning, chartState.currentSymbol]);

    const handlePause = () => setChartState(prev => ({ ...prev, isRunning: false }));

    const handleResume = () => {
        if (chartState.currentSymbol) {
            setChartState(prev => ({ ...prev, isRunning: true }));
        }
    };

    const handleClear = () => setChartState(prev => ({ ...prev, data: [] }));

    const handleSwitchSymbol = (symbol) => {
        setChartState({
            currentSymbol: symbol,
            isRunning: false,
            data: []
        });
    };

    const handleToggle = () => {
        if (chartState.currentSymbol) {
            setChartState(prev => ({ ...prev, isRunning: !prev.isRunning }));
        }
    };

    const currentPrice = chartState.data.length > 0 ? chartState.data[chartState.data.length - 1].price : 0;
    const previousPrice = chartState.data.length > 1 ? chartState.data[chartState.data.length - 2].price : 0;
    const priceChange = currentPrice - previousPrice;

    return (
        <div className="nf_app">
            {chartState.currentSymbol && (
                <>
                    <Header
                        symbol={chartState.currentSymbol}
                        currentPrice={currentPrice}
                        priceChange={priceChange}
                        isConnected={chartState.isRunning}
                    />
                    <ChartComponent chartData={chartState.data} />
                    <FooterComponent
                        isRunning={chartState.isRunning}
                        onPause={handlePause}
                        onResume={handleResume}
                        onClear={handleClear}
                        onSwitch={handleSwitchSymbol}
                        currentSymbol={chartState.currentSymbol}
                        onToggle={handleToggle}
                        dataPoints={chartState.data.length}
                        symbols={symbols}
                    />
                </>
            )}
        </div>
    );
}

export default App;