import React, { useState } from 'react';

const DataForm = ({ onSubmit, onImageUpload }) => {
    const [formData, setFormData] = useState({
        deviceID: '',
        captureTime: '',
        captureLocation: '',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onImageUpload(file); // 即時預覽圖片
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // 提交表單數據
    };

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