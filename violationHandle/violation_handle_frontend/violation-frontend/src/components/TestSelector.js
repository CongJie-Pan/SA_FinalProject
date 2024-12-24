import React from 'react';

const TestSelector = ({ onSelect }) => {
    const testCases = [
        { id: 1, name: '事件資料接收測試' },
        { id: 2, name: '超速違規判斷測試' },
        { id: 3, name: '數據格式化測試' },
        { id: 4, name: '數據儲存測試' },
        { id: 5, name: '數據分流測試' },
    ];

    return (
        <div>
            <label>選擇測試案例:</label>
            <select onChange={(e) => onSelect(e.target.value)}>
                <option value="">-- 請選擇 --</option>
                {testCases.map((test) => (
                    <option key={test.id} value={test.id}>
                        {test.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TestSelector;
