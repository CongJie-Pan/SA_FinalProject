import React, { useState } from 'react';

const DataForm = ({ testCaseId, onSubmit }) => {
    const [formData, setFormData] = useState({
        violationId: '',
        location: '',
        speedLimit: '',
        vehicleSpeed: '',
        rawSpeed: '',
        rawTime: '',
        uploadedImage: null,
    });
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, uploadedImage: file });
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
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
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
            }}
        >
            {(testCaseId === '1' || testCaseId === '4') && (
                <>
                    <label>
                        舉發 ID:
                        <input
                            type="text"
                            name="violationId"
                            value={formData.violationId}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                    <label>
                        違規地點:
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                </>
            )}
            {(testCaseId === '1' || testCaseId === '2') && (
                <>
                    <label>
                        道路速限 (km/h):
                        <input
                            type="number"
                            name="speedLimit"
                            value={formData.speedLimit}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                    <label>
                        車輛時速 (km/h):
                        <input
                            type="number"
                            name="vehicleSpeed"
                            value={formData.vehicleSpeed}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                </>
            )}
            {testCaseId === '3' && (
                <>
                    <label>
                        原始時速數據:
                        <input
                            type="number"
                            name="rawSpeed"
                            value={formData.rawSpeed}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                    <label>
                        原始時間格式:
                        <input
                            type="text"
                            name="rawTime"
                            placeholder="2024-12-22T14:00:00Z"
                            value={formData.rawTime}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                </>
            )}
            {(testCaseId === '1' || testCaseId === '4' || testCaseId === '5') && (
                <>
                    <label>
                        上傳圖片:
                        <input type="file" name="uploadedImage" onChange={handleFileChange} />
                    </label>
                    {previewImage && (
                        <div style={{ textAlign: 'center', marginTop: '15px' }}>
                            <p>圖片預覽：</p>
                            <img src={previewImage} alt="Preview" style={{ width: '200px', height: 'auto' }} />
                        </div>
                    )}
                </>
            )}
            <button
                type="submit"
                style={{
                    padding: '10px 15px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                提交測試
            </button>
        </form>
    );
};

export default DataForm;
