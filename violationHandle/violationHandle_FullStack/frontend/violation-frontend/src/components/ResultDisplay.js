import React from 'react';

const ResultDisplay = ({ aiResult, verificationResult, comparisonStatus }) => {
    return (
        <div
            style={{
                marginTop: '20px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '600px',
                backgroundColor: comparisonStatus === '資訊無誤，結果一致' ? '#e6ffe6' : '#ffe6e6',
            }}
        >
            <h3>AI 辨識結果：</h3>
            <p>車牌號碼：{aiResult.licensePlate}</p>

            <h3>車牌驗證結果：</h3>
            <p>車牌號碼：{verificationResult.LicensePlate || '無資料'}</p>
            <p>車型：{verificationResult.VehicleType || '無資料'}</p>
            <p>車色：{verificationResult.VehicleColor || '無資料'}</p>
            <p>車主姓名：{verificationResult.VehicleRegisterName || '無資料'}</p>

            <h3>比較結果：</h3>
            <p style={{ fontWeight: 'bold' }}>{comparisonStatus}</p>
        </div>
    );
};

export default ResultDisplay;