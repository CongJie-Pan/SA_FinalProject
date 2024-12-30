// 此元件用於展示AI辨識結果和驗證比對的結果
// 根據不同的辨識結果顯示不同的背景顏色和相應的詳細資訊

// 引入React函式庫
import React from 'react';

// 定義ResultDisplay元件，接收AI結果、驗證結果和比對狀態作為props
const ResultDisplay = ({ aiResult, verificationResult, comparisonStatus }) => {
    // 判斷是否需要人工審核
    const needsManualReview = aiResult.licensePlate === '需要人工辨識';
    // 根據結果設定不同的背景顏色
    const backgroundColor = needsManualReview ? '#fff3cd' :
        (comparisonStatus === '資訊無誤，結果一致' ? '#e6ffe6' : '#ffe6e6');

    // 返回結果顯示介面
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
            {/* AI辨識結果區段 */}
            <h3>AI 辨識結果：</h3>
            {/* 根據是否需要人工審核顯示不同的內容 */}
            {needsManualReview ? (
                // 人工審核提示區段
                <div className="manual-review-section" style={{ padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
                    <p style={{ color: '#856404', fontWeight: 'bold' }}>⚠️ 需要人工辨識</p>
                    <p>原因：{aiResult.reason || '無法確定辨識結果'}</p>
                    {aiResult.aiLicensePlate && (
                        <p>系統初步辨識結果：{aiResult.aiLicensePlate}
                            <span style={{ color: '#856404', fontSize: '0.9em' }}> (請人工確認)</span>
                        </p>
                    )}
                </div>
            ) : (
                // 顯示辨識出的車牌號碼
                <p>車牌號碼：{aiResult.licensePlate || '無法辨識'}</p>
            )}

            {/* 非人工審核情況下顯示驗證結果和比較結果 */}
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