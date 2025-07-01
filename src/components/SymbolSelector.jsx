/** React Imports */
import React, { useState, useRef, useEffect } from "react";

/** Local Imports */
import styles from "./source/styles/SymbolSelector.module.scss";

/** Main Export */
const SymbolSelector = ({ symbols, onSelect, currentSymbol, disabled }) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSelect = (symbol) => {
        onSelect(symbol);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`${styles.symbol_selector}`} ref={dropdownRef}>
            <div
                className={styles.symbol_selector__selected}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                {currentSymbol || "Select Symbol"}
                <span className={styles.symbol_selector__arrow}>{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
                <div className={styles.symbol_selector__options}>
                    {symbols.map((symbol) => (
                        <div
                            key={symbol}
                            className={styles.symbol_selector__option}
                            onClick={() => handleSelect(symbol)}
                        >
                            {symbol}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SymbolSelector;
