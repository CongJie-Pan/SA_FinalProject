// 此檔案是違規處理系統的主要前端組件，負責整合所有子組件和處理核心業務邏輯
// 包含違規舉發、AI辨識、人工審核和罰單生成等主要功能的實現

import React, { useState, useEffect } from 'react';
import ResultDisplay from './components/ResultDisplay';
import TicketPage from './components/TicketPage';
import DataForm from './components/DataForm';
import axios from 'axios';
import DatabaseContent from './components/DatabaseContent';

// 設定違規ID的初始值
let currentID = 1;

const App = () => {
    // 狀態管理區域
    // violationID: 當前違規案件的ID
    const [violationID, setViolationID] = useState(`0${currentID}`);
    // previewImage: 儲存上傳圖片的預覽
    const [previewImage, setPreviewImage] = useState(null);
    // comparisonStatus: AI辨識結果的狀態
    const [comparisonStatus, setComparisonStatus] = useState(null);
    // resultData: 儲存AI辨識和車輛驗證的結果
    const [resultData, setResultData] = useState(null);
    const [showTicketPage, setShowTicketPage] = useState(false);
    const [violations, setViolations] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDatabaseContent, setShowDatabaseContent] = useState(false);
    const [processStatus, setProcessStatus] = useState('');
    const [ticketData, setTicketData] = useState(null);

    // 新增：用於控制當前顯示的頁面
    const [currentPage, setCurrentPage] = useState('main');

    // 確認違規是否已確認
    const [isViolationConfirmed, setIsViolationConfirmed] = useState(false);

    // 初始化時從後端獲取違規和罰單資料
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [violationsResponse, ticketsResponse] = await Promise.all([
                    axios.get('http://localhost:3001/api/violations'),
                    axios.get('http://localhost:3001/api/tickets')
                ]);
                setViolations(violationsResponse.data);
                setTickets(ticketsResponse.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.response?.status ? `服務器錯誤: ${error.response.status}` : '無法連接到服務器');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 處理表單提交的主要函數
    const handleFormSubmit = async (formData) => {
        try {
            // 開始處理違規資料
            setProcessStatus('開始處理違規資料...');

            // 使用接收到的 formData
            const violationResponse = await axios.post('http://localhost:3001/api/violations', formData);

            const { id } = violationResponse.data;
            setViolationID(`0${id}`);
            setProcessStatus('違規資料已上傳，ID: ' + `0${id}`);

            // AI辨識流程
            setProcessStatus('正在進行 AI 辨識...');
            const aiResponse = await axios.post('http://localhost:3001/api/ai/recognize-plate', {
                ViolationID: id,
                ViolationImage: previewImage,
            });

            console.log('AI Response:', aiResponse.data);  // 添加這行來查看 AI 響應

            const aiResult = aiResponse.data;
            setProcessStatus('AI 辨識完成');

            // 檢查 AI 辨識結果
            if (aiResult.needsManualReview || 
                !aiResult.aiLicensePlate || 
                aiResult.aiLicensePlate.length < 5) {  // 假設正常車牌至少5字元
                
                setComparisonStatus('需要人工辨識');
                setResultData({
                    aiResult: { 
                        licensePlate: '需要人工辨識', 
                        reason: aiResult.reason || '圖片品質不佳或無法確認',
                        aiLicensePlate: aiResult.aiLicensePlate || '無法完全辨識'
                    },
                    verificationResult: null
                });
                setProcessStatus('AI 辨識結果：需要人工辨識');
                return;
            }

            // 更新這部分以使用正確的屬性名
            const recognizedPlate = aiResult.aiLicensePlate;

            // 車牌驗證流程
            setProcessStatus('正在驗證車牌資訊...');
            let verificationResult;
            try {
                const verificationResponse = await axios.get(`http://localhost:3001/api/vehicleInfo/${recognizedPlate}`);
                verificationResult = verificationResponse.data;
            } catch (error) {
                console.error('Error fetching vehicle info:', error);
                verificationResult = null;
            }

            const isMatch = verificationResult ? (recognizedPlate === verificationResult.LicensePlate) : false;

            setComparisonStatus(isMatch ? '資訊無誤，結果一致' : '資訊不匹配或未找到車輛資訊，請重新確認，或可能是假車牌，向警政機關報案。');
            setResultData({
                aiResult: { licensePlate: recognizedPlate },
                verificationResult: verificationResult ? {
                    LicensePlate: verificationResult.LicensePlate,
                    VehicleType: verificationResult.VehicleType,
                    VehicleColor: verificationResult.VehicleColor,
                    VehicleRegisterName: verificationResult.VehicleRegisterName
                } : {
                    LicensePlate: '',
                    VehicleType: '',
                    VehicleColor: '',
                    VehicleRegisterName: ''
                },
            });

            setViolations(prevViolations => [...prevViolations, violationResponse.data]);
            setProcessStatus('處理完成');

        } catch (error) {
            // 錯誤處理邏輯
            /* 為什麼不加入處理員手動輸入正確車號的欄位？*/
            /* 因為，防止處理員有情緒或其他理由，在系統設計上，就防止處理員擅自竄改或新增車號，寧願漏掉，也防止氾濫竄改使用，因此只能進行駁回或允許 */
            console.error('Error submitting form:', error);
            console.error('Form data:', formData);

            if (error.message.includes('表單數據為空') || error.message.includes('表單數據不完整')) {
                setProcessStatus(`處理錯誤: ${error.message}`);
            } else if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                setProcessStatus(`處理錯誤: ${error.response.status} - ${error.response.data.message || '未知錯誤'}`);
                // 將未知錯誤轉為需要人工審核
                setComparisonStatus('需要人工辨識');
                setResultData({
                    aiResult: {
                        licensePlate: '需要人工辨識',
                        reason: '模糊或多重車牌，需要人工審核',
                        aiLicensePlate: error.response?.data?.aiLicensePlate || '無法辨識'
                    },
                    verificationResult: null
                });
                setProcessStatus('AI 辨識結果：需要人工辨識');
            } else if (error.request) {
                console.error('No response received');
                setProcessStatus('處理錯誤: 無法連接到服務器');
            } else {
                console.error('Error message:', error.message);
                setProcessStatus(`處理錯誤: ${error.message}`);
            }
            setComparisonStatus('提交表單時發生錯誤');
        }
    };

    // 處理圖片上傳的函數
    const handleImageUpload = (file) => {
        setProcessStatus('正在上傳圖片...');
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
            setProcessStatus('圖片上傳完成');
        };
        reader.readAsDataURL(file);
    };

    // 處理導航到罰單頁面的函數
    const handleNavigateToTicket = async () => {
        try {
            setProcessStatus('正在生成罰單...');
            console.log(`開始生成罰單，違規ID: ${violationID}`);

            // 格式化當前日期時間為 MySQL 可接受的格式
            const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const response = await axios.post('http://localhost:3001/api/tickets', {
                ViolationID: violationID.replace('0', ''),
                FineAmount: 1200,
                CompletionTime: currentDate,
                NotificationStatus: false
            });

            console.log('罰單生成成功，伺服器回應:', response.data);

            // 檢查回應中是否包含預期的數據
            if (response.data && response.data.message) {
                // 假設後端返回的是 { message: 'Ticket generated successfully', ticketId: 123 }
                setTicketData({
                    TicketID: response.data.ticketId,
                    ViolationID: violationID.replace('0', ''),
                    FineAmount: 1200,
                    CompletionTime: currentDate,
                    NotificationStatus: false
                });
                setCurrentPage('ticket'); // 切換到罰單頁面
                setProcessStatus(`罰單生成成功，罰單ID: ${response.data.ticketId}`);
            } else {
                throw new Error('伺服器回應中缺少預期的數據');
            }
        } catch (error) {
            console.error('生成罰單時發生錯誤:', error);
            let errorMessage = '生成罰單失敗';
            if (error.response) {
                errorMessage += `: ${error.response.status} - ${error.response.data.message || '未知錯誤'}`;
                console.error('伺服器回應:', error.response.data);
            } else if (error.request) {
                errorMessage += ': 無法連接到伺服器';
            } else {
                errorMessage += `: ${error.message}`;
            }
            setProcessStatus(errorMessage);
        }
    };

    // 新增：返回主頁面的函數
    const handleReturnToMain = () => {
        setCurrentPage('main');
    };

    // 處理人工審核的函數
    const handleManualReview = async (action) => {
        try {
            if (action === 'reject') {
                setProcessStatus('❌ 駁回違規️');
                setIsViolationConfirmed(false);
            } else if (action === 'confirm') {
                const violationId = violationID.replace('0', '');
                // 新增：確認違規時寫入 ProcessingLog
                await axios.post('http://localhost:3001/api/processing-logs', {
                    ViolationID: violationId,
                    ErrorCode: '01',
                    ProcessedBy: 'Worker',
                    Remarks: '人工審核確認違規'
                });
                
                const detectedPlate = resultData?.aiResult?.aiLicensePlate;
                setProcessStatus(`✅ 確認違規 (參考車牌: ${detectedPlate || '無'})`);
                setIsViolationConfirmed(true);
            }
        } catch (error) {
            console.error('Error in manual review:', error);

            let errorMessage = '處理失敗: ';
            if (error.response) {
                // 伺服器回應的錯誤
                errorMessage += `伺服器錯誤 (${error.response.status}): ${error.response.data.message || '未知錯誤'}`;
            } else if (error.request) {
                // 請求發送成功，但沒有收到回應
                errorMessage += '無法連接到伺服器，請檢查網路連接';
            } else {
                // 其他錯誤
                errorMessage += error.message || '未知錯誤';
            }

            setProcessStatus(errorMessage);

            // 記錄錯誤到處理日誌
            try {
                await axios.post('http://localhost:3001/api/processing-logs', {
                    ViolationID: violationID.replace('0', ''),
                    ErrorCode: '99',
                    ProcessedBy: 'Worker',
                    Remarks: `人工審核失敗: ${errorMessage}`
                });
            } catch (logError) {
                console.error('無法記錄錯誤到處理日誌:', logError);
            }
        }
    };

    // 切換資料庫內容顯示的函數
    const toggleDatabaseContent = () => {
        setShowDatabaseContent(!showDatabaseContent);
    };

    // 渲染UI的返回區域
    return (
        // 主要介面容器
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            minHeight: '100vh',
        }}>
            {/* 標題區域 */}
            <h1 style={{ marginBottom: '20px' }}>違規處理系統</h1>

            {/* 資料庫內容切換按鈕 */}
            <button onClick={toggleDatabaseContent} style={{ marginBottom: '20px' }}>
                {showDatabaseContent ? '返回主頁' : '預覽資料庫內容'}
            </button>

            {/* 條件渲染：顯示資料庫內容或主要處理介面 */}
            {showDatabaseContent ? (
                // 顯示資料庫內容組件
                <DatabaseContent violations={violations} tickets={tickets} loading={loading} error={error} />
            ) : (
                // 主要處理介面
                <>
                    {/* 違規ID顯示 */}
                    <p>當前舉發 ID：{violationID}</p>

                    {/* 表單區域 */}
                    <div style={{ width: '100%', maxWidth: '600px', marginTop: '20px' }}>
                        <DataForm onSubmit={handleFormSubmit} onImageUpload={handleImageUpload} />
                    </div>

                    {/* 圖片預覽區域 */}
                    {previewImage && (
                        <div style={{
                            marginTop: '20px',
                            textAlign: 'center',
                        }}>
                            <h3>上傳圖片預覽</h3>
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: '300px' }}
                            />
                        </div>
                    )}

                    {/* 處理狀態顯示 */}
                    {processStatus && (
                        <div style={{
                            marginTop: '10px',
                            padding: '10px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '5px',
                            textAlign: 'center'
                        }}>
                            <p>{processStatus}</p>
                        </div>
                    )}

                    {/* AI辨識結果顯示 */}
                    {resultData && (
                        <ResultDisplay
                            aiResult={resultData.aiResult}
                            verificationResult={resultData.verificationResult}
                            comparisonStatus={comparisonStatus}
                            needsManualReview={resultData.aiResult.licensePlate === '需要人工辨識'}
                        />
                    )}

                    {/* 人工審核按鈕區域 */}
                    {resultData && resultData.aiResult.licensePlate === '需要人工辨識' && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            marginTop: '20px'
                        }}>
                            <button
                                onClick={() => handleManualReview('reject')}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                駁回
                            </button>
                            <button
                                onClick={() => handleManualReview('confirm')}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                確認違規
                            </button>
                        </div>
                    )}


                    {/* 生成罰單按鈕和罰單頁面 */}
                    {(comparisonStatus === '資訊無誤，結果一致' || isViolationConfirmed === true) && (
                        <>
                            <button
                                onClick={handleNavigateToTicket}
                                style={{
                                    marginTop: '10px',
                                    padding: '10px 20px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                生成罰單
                            </button>
                        </>
                    )}

                    {/* 顯示罰單頁面 */}
                    {currentPage === 'ticket' && ticketData && (
                        <TicketPage
                            ticketData={ticketData}
                            onClose={handleReturnToMain}
                        />
                    )}




                </>
            )}
        </div>
    );
}

export default App;