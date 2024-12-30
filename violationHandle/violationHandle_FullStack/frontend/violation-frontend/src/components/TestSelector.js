// 此元件用於提供測試案例的選擇介面
// 允許使用者從預定義的測試案例清單中選擇要執行的測試

// 引入React函式庫
import React from 'react';

// 定義TestSelector元件，接收選擇處理函數作為prop
const TestSelector = ({ onSelect }) => {
    // 定義測試案例陣列
    const testCases = [
        // 每個測試案例包含id和名稱
        { id: 1, name: '事件資料接收測試' },
        { id: 2, name: '超速違規判斷測試' },
        { id: 3, name: '數據格式化測試' },
        { id: 4, name: '數據儲存測試' },
        { id: 5, name: '數據分流測試' },
    ];

    // 返回選擇器介面
    return (
        <div>
            {/* 選擇器標籤 */}
            <label>選擇測試案例:</label>
            {/* 下拉式選單，變更時觸發onSelect函數 */}
            <select onChange={(e) => onSelect(e.target.value)}>
                {/* 預設選項 */}
                <option value="">-- 請選擇 --</option>
                {/* 映射測試案例陣列到選項 */}
                {testCases.map((test) => (
                    // 每個選項包含測試案例的id和名稱
                    <option key={test.id} value={test.id}>
                        {test.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TestSelector;
