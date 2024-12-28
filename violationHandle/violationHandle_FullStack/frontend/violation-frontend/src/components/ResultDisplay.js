import React from 'react';

const ResultDisplay = ({ aiResult, verificationResult, comparisonStatus }) => {
    const needsManualReview = aiResult.licensePlate === '需要人工辨識';
    const backgroundColor = needsManualReview ? '#fff3cd' :
        (comparisonStatus === '資訊無誤，結果一致' ? '#e6ffe6' : '#ffe6e6');

    return (
        <div
            style={{
                marginTop: '20px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '600px',
                backgroundColor: backgroundColor,
            }}
        >
            <h3>AI 辨識結果：</h3>
            {needsManualReview ? (
                <>
                    <p>車牌號碼：需要人工辨識</p>
                    <p>原因：{aiResult.reason || '太模糊或偵測1個以上車牌，無法順利辨識'}</p>
                </>
            ) : (
                <p>車牌號碼：{aiResult.licensePlate || '無法辨識'}</p>
            )}

            {!needsManualReview && (
                <>
                    <h3>車牌驗證結果：</h3>
                    {verificationResult ? (
                        <>
                            <p>車牌號碼：{verificationResult.LicensePlate || '無資料'}</p>
                            <p>車型：{verificationResult.VehicleType || '無資料'}</p>
                            <p>車色：{verificationResult.VehicleColor || '無資料'}</p>
                            <p>車主姓名：{verificationResult.VehicleRegisterName || '無資料'}</p>
                        </>
                    ) : (
                        <p>無法獲取車輛資訊</p>
                    )}

                    <h3>比較結果：</h3>
                    <p style={{ fontWeight: 'bold' }}>{comparisonStatus}</p>
                </>
            )}


        </div>
    );
};

export default ResultDisplay;