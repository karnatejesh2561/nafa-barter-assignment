/** Libraries */
import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
/** Styles */
import styles from './source/styles/ChartComponent.module.scss'
import { useState } from 'react';

/** Main Export */
const ChartComponent = ({ chartData }) => {

    const [zoomLevel, setZoomLevel] = useState(50); // Number of points displayed
    const [offset, setOffset] = useState(0); // Starting point of displayed data

    const handleZoomIn = () => {
        if (zoomLevel > 10) setZoomLevel(prev => prev - 10);
    };

    const handleZoomOut = () => {
        if (zoomLevel < chartData.length) setZoomLevel(prev => prev + 10);
    };

    const handlePanLeft = () => {
        if (offset > 0) setOffset(prev => prev - 5);
    };

    const handlePanRight = () => {
        if (offset + zoomLevel < chartData.length) setOffset(prev => prev + 5);
    };

    const visibleData = chartData.slice(Math.max(0, chartData.length - zoomLevel - offset), chartData.length - offset);

    return (
        <div className={styles.nf_chart_area}>
            <div className='contain' style={{ width: "100%" }}>
                <div className={styles.nf_chart_area_wrap}>
                    <div className={styles.nf_top_area}>
                        <p className={styles.nf_title}>Live Price Chart</p>
                        <div className={styles.nf_chart_controls}>

                            <button onClick={handleZoomIn} className={styles.nf_chart_controls__button} title="Zoom In">
                                <ZoomIn size={16} />
                            </button>
                            <button onClick={handleZoomOut} className={styles.nf_chart_controls__button} title="Zoom Out">
                                <ZoomOut size={16} />
                            </button>
                            <button onClick={handlePanLeft} className={styles.nf_chart_controls__button} title="Pan Left">
                                <ChevronLeft size={16} />
                            </button>
                            <button onClick={handlePanRight} className={styles.nf_chart_controls__button} title="Pan Right">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.nf_chat_body} >
                        <ResponsiveContainer width="100%" height="100%" >
                            <AreaChart data={visibleData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#22c55e" stopOpacity={0.7} />
                                        <stop offset="100%" stopColor="#22c55e" stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="rgba(122, 139, 144, 0.2)" strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="time"
                                    // axisLine={false}
                                    tick={{
                                        fill: "rgba(122, 139, 144, 0.9)",
                                        fontSize: "0.625rem",
                                        fontWeight: "600",
                                        dx: 0,
                                    }}
                                    // tickLine={false}
                                />
                                <YAxis
                                    domain={['auto', 'auto']}
                                    tickFormatter={(val) => `${val}`}
                                    // axisLine={false}
                                    // tickLine={false}
                                    tick={{
                                        fill: "rgba(122, 139, 144, 0.9)",
                                        fontSize: "0.625rem",
                                        fontWeight: "600",
                                    }}
                                />
                                <Tooltip
                                    formatter={(value) => [`${value}`, 'Price']}
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e7e7e7',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.725rem',
                                        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                                    }}
                                    labelStyle={{ fontSize: '0.625rem', color: '#666' }}
                                    itemStyle={{ fontSize: '0.725rem' }}
                                    cursor={{ stroke: '#22c55e', strokeWidth: 1 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#82D2BB"
                                    fill="url(#accuracyGradient)"
                                    strokeWidth={2}
                                    dot={{ r: 4, stroke: '#22c55e', strokeWidth: 2, fill: '#fff' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
