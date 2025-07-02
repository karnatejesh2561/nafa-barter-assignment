/** React Imports */
import React from 'react'

/** Libraries */
import { TrendingUp, Activity } from "lucide-react";

/** Styles */
import styles from '../source/styles/Header.module.scss'

/** Main Export */
const Header = ({ symbol, symbolConfig, currentPrice, priceChange, isConnected }) => {
    const isPositive = priceChange >= 0;

    return (
        <div className={styles.nf_header}>
            <div className={styles.nf_header__container}>
                <div className={styles.nf_header__title}>
                    <TrendingUp />
                    <div>
                        Real-Time Symbol Chart Dashboard
                        <p
                            className={`${styles.nf_header__status} ${isConnected ? styles.nf_header__status__live : styles.nf_header__status__disconnected
                                }`}
                        >
                            <Activity  />
                            <span>{isConnected ? "LIVE" : "DISCONNECTED"}</span>
                        </p>
                    </div>
                </div>

                <div className={styles.nf_header__symbol}>
                    <div className={styles.nf_header__symbol__name}>
                        {symbol}
                    </div>
                    <div className={styles.nf_header__symbol__price}>
                        <div className={styles.nf_price}>
                            {currentPrice.toFixed(symbol === "USDJPY" ? 2 : 4)}
                        </div>
                        <div
                            className={`${styles.nf_header__symbol__change} ${isPositive ? styles.nf_header__symbol__change__up : styles.nf_header__symbol__change__down
                                }`}
                        >
                            <div  className={`${styles.nf_header__symbol__change} ${isPositive ? styles.nf_header__symbol__change__up : styles.nf_header__symbol__change__down
                                }`}>
                                {isPositive ? "+" : ""}
                                {priceChange.toFixed(4)}
                            </div>
                            <div  className={`${styles.nf_header__symbol__change} ${isPositive ? styles.nf_header__symbol__change__up : styles.nf_header__symbol__change__down
                                }`}>
                                ({isPositive ? "+" : ""}
                                {((priceChange / currentPrice) * 100).toFixed(2)}%)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;