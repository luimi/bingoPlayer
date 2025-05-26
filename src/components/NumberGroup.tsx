import React from 'react';

interface NumberGroupProps {
    letter?: string;
    from?: number;
    to?: number;
    numbers?: number[];
    setNumber?: any;
    unsetNumber?: any;
}

const NumberGroup: React.FC<NumberGroupProps> = ({
    letter = 'LETTER',
    from = 1,
    to = 15,
    numbers = [],
    setNumber,
    unsetNumber
}) => {
    const currentNumbers = Array.from(
        { length: to - from + 1 },
        (_, i) => from + i
    );
    return (
        <div className="number-group">
            <div className="header">{letter}</div>
            <div className="grid">
                {currentNumbers.map((num) => {
                    return (
                        <div key={num} className={`cell ${numbers.includes(num) ? 'active' : ''}`} onClick={() => {
                            if (numbers.includes(num)) {
                                unsetNumber(num)
                            } else {
                                setNumber(num)
                            }
                        }}>
                            {num}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NumberGroup;
