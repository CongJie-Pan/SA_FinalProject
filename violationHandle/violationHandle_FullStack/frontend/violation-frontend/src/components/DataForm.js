// 此元件用於提供資料輸入表單介面
// 允許使用者輸入設備ID、拍攝時間、地點，並上傳圖片

// 引入必要的React組件
import React, { useState } from 'react';

// 定義DataForm元件，接收表單提交和圖片上傳處理函數作為props
const DataForm = ({ onSubmit, onImageUpload }) => {
    // 使用useState管理表單數據
    const [formData, setFormData] = useState({
        // 初始化表單欄位
        deviceID: '',
        captureTime: '',
        captureLocation: '',
    });

    // 處理文件上傳
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onImageUpload(file); // 即時預覽圖片
    };

    // 處理Input欄位變更
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // 處理表單提交
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // 提交表單數據
    };

    // 返回表單介面
    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
            }}
        >
            {/* 各個輸入欄位 */}
            <label>
                設備 ID：
                <input
                    type="text"
                    name="deviceID"
                    value={formData.deviceID}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                拍攝時間：
                <input
                    type="datetime-local"
                    name="captureTime"
                    value={formData.captureTime}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                拍攝地點：
                <input
                    type="text"
                    name="captureLocation"
                    value={formData.captureLocation}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                上傳車牌圖像：
                <input type="file" name="uploadedImage" onChange={handleFileChange} required />
            </label>
            <button
                type="submit"
                style={{
                    padding: '10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                提交
            </button>
        </form>
    );
};

export default DataForm;