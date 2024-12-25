import React from 'react';

const DataForm = ({ onSubmit, onImageUpload }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onImageUpload(file); // 即時預覽圖片
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(); // 提交表單並模擬結果
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
                上傳車牌圖像：
                <input type="file" name="uploadedImage" onChange={handleFileChange} />
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
