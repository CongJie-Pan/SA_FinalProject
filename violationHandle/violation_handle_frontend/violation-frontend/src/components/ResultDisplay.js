import React from 'react';

const ResultDisplay = ({ result }) => {
    return (
        <div>
            <h3>測試結果：</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
    );
};

export default ResultDisplay;
