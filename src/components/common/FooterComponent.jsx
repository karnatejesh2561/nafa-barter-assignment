/** React Imports */
import { Pause, Play, Square, } from "lucide-react";

// import SymbolSelector from "./SymbolSelector";
import styles from "../source/styles/Footer.module.scss"; // Example CSS Module
import SymbolSelector from "../SymbolSelector";

const FooterComponent = ({
    isRunning,
    onClear,
    onSwitch,
    currentSymbol,
    onToggle,
    dataPoints,
    symbols // 🔑 Now received from parent
}) => {

    const handleSymbolChange = (symbol) => {
        onSwitch(symbol);
    };

    return (
        <div className={styles.nf_footer}>
            <div className={styles.nf_footer__container}>
                <div className={styles.nf_footer__actions}>
                    <button
                        onClick={onToggle}
                        className={`${styles.nf_footer__button} ${isRunning ? styles.nf_footer__pause : styles.nf_footer__resume}`}
                    >
                        {isRunning ? <Pause className={styles.nf_footer__icon} /> : <Play className={styles.nf_footer__icon} />}
                        <span>{isRunning ? "Pause" : "Resume"}</span>
                    </button>

                    <button
                        onClick={onClear}
                        className={`${styles.nf_footer__button} ${styles.nf_footer__clear}`}
                    >
                        <Square className={styles.nf_footer__icon} />
                        <span>Clear</span>
                    </button>
                </div>

                <div className={styles.nf_footer__info}>
                    <div className={styles.nf_footer__datapoints}>
                        Data Points: <span className={styles.nf_footer__count}>{dataPoints}</span>
                    </div>
                    <SymbolSelector
                        symbols={symbols} // 🔑 Passed from FooterComponent
                        currentSymbol={currentSymbol}
                        onSelect={handleSymbolChange}
                        disabled={isRunning}
                    />
                </div>
            </div>
        </div>
    );
};

export default FooterComponent;