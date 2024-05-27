import React, {useState, useEffect} from 'react';

const MultipartProgressBar = ({numParts}) => {
    const [progressValues, setProgressValues] = useState(Array(numParts).fill(0));
    const [overallComplete, setOverallComplete] = useState(false);

    useEffect(() => {
        if (progressValues.length > 0) {
            const interval = setInterval(() => {
                setProgressValues(prevProgressValues =>
                    prevProgressValues.map(value => Math.min(value + Math.random() * 15, 100))
                );
            }, 250);

            return () => clearInterval(interval);
        }
    }, [progressValues.length]);

    useEffect(() => {
        if (progressValues.length > 0 && progressValues.every(value => value === 100)) {
            setOverallComplete(true);
        }
    }, [progressValues]);

    const overallProgress = progressValues.reduce((a, b) => a + b, 0) / progressValues.length;

    const getBorderRadius = (index, length) => {
        if (index === 0) {
            return 'rounded-l-full';
        } else if (index === length - 1) {
            return 'rounded-r-full';
        } else {
            return '';
        }
    };

    return (
        <div className="w-full mt-2">
            {!overallComplete ? (
                <div className="flex w-full">
                    {progressValues.map((progress, index) => (
                        <div
                            key={index}
                            className={`flex-1 h-2 bg-gray-200 overflow-hidden mr-1 last:mr-0 ${getBorderRadius(index, progressValues.length)}`}
                        >
                            <div
                                className="h-full bg-green-500 transition-all duration-500"
                                style={{width: `${progress}%`}}
                            ></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-500"
                        style={{width: '100%'}}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default MultipartProgressBar;
