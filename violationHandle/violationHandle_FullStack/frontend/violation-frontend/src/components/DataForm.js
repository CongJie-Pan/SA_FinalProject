import React, { useState, useEffect } from 'react';

// 台北市地址列表，100筆資料
const TAIPEI_LOCATIONS = [ 
    '台北市信義區忠孝東路五段510號',
    '台北市中正區羅斯福路三段100號',
    '台北市大安區和平東路二段320號',
    '台北市松山區復興北路30號',
    '台北市中山區南京西路100號',
    '台北市內湖區民權東路六段200號',
    '台北市士林區中山北路五段222號',
    '台北市北投區中央北路二段50號',
    '台北市文山區景美街10號',
    '台北市萬華區成都路60號',
    '台北市信義區松仁路168號',
    '台北市中正區北平東路2號',
    '台北市大安區新生南路三段105號',
    '台北市松山區塔悠路30號',
    '台北市中山區建國北路18號',
    '台北市內湖區環山路一段88號',
    '台北市士林區中正路300號',
    '台北市北投區明德路78號',
    '台北市文山區興隆路二段45號',
    '台北市萬華區艋舺大道20號',
    '台北市信義區基隆路二段123號',
    '台北市中正區和平西路一段12號',
    '台北市大安區辛亥路二段270號',
    '台北市松山區民生東路五段78號',
    '台北市中山區雙城街100號',
    '台北市內湖區洲子街123號',
    '台北市士林區士東路40號',
    '台北市北投區大度路三段88號',
    '台北市文山區木新路三段66號',
    '台北市萬華區環河南路二段9號',
    '台北市信義區永春街25號',
    '台北市中正區仁愛路一段89號',
    '台北市大安區安和路二段15號',
    '台北市松山區八德路四段299號',
    '台北市中山區龍江路45號',
    '台北市內湖區港墘路50號',
    '台北市士林區天母東路5號',
    '台北市北投區石牌路二段120號',
    '台北市文山區政大路99號',
    '台北市萬華區和平西路三段88號',
    '台北市信義區松山路168號',
    '台北市中正區三民路58號',
    '台北市大安區仁愛路三段10號',
    '台北市松山區敦化北路20號',
    '台北市中山區松江路100號',
    '台北市內湖區舊宗路二段120號',
    '台北市士林區福國路45號',
    '台北市北投區中央南路三段30號',
    '台北市文山區景中街58號',
    '台北市萬華區西園路二段10號',
    '台北市信義區信義路四段330號',
    '台北市中正區忠孝西路一段99號',
    '台北市大安區和平東路三段56號',
    '台北市松山區撫遠街18號',
    '台北市中山區北安路78號',
    '台北市內湖區瑞光路360號',
    '台北市士林區社子街22號',
    '台北市北投區新北路33號',
    '台北市文山區保儀路90號',
    '台北市萬華區桂林路58號',
    '台北市信義區光復南路350號',
    '台北市中正區徐州路10號',
    '台北市大安區龍安街9號',
    '台北市松山區新中街40號',
    '台北市中山區吉林路50號',
    '台北市內湖區湖光路8號',
    '台北市士林區天母西路2號',
    '台北市北投區北投路一段20號',
    '台北市文山區指南路二段78號',
    '台北市萬華區富民街100號',
    '台北市信義區市民大道四段220號',
    '台北市中正區南昌路二段10號',
    '台北市大安區和平東路四段15號',
    '台北市松山區新生北路三段55號',
    '台北市中山區大直街89號',
    '台北市內湖區康寧路三段58號',
    '台北市士林區福德路100號',
    '台北市北投區溫泉路300號',
    '台北市文山區興隆路三段60號',
    '台北市萬華區長沙街二段78號',
    '台北市信義區松高路123號',
    '台北市中正區愛國東路200號',
    '台北市大安區文昌街45號',
    '台北市松山區健康路5號',
    '台北市中山區建國北路四段90號',
    '台北市內湖區陽光街78號',
    '台北市士林區延平北路五段120號',
    '台北市北投區大業路60號',
    '台北市文山區福興路18號',
    '台北市萬華區萬大路8號',
    '台北市信義區和平東路二段90號',
    '台北市中正區羅斯福路二段45號',
    '台北市大安區基隆路三段23號',
    '台北市松山區南京東路四段300號',
    '台北市中山區民權東路二段100號',
];


// 生成隨機設備ID (001-300)
const generateRandomDeviceId = () => {
    const randomNum = Math.floor(Math.random() * 300) + 1;
    return randomNum.toString().padStart(3, '0');
};

// 獲取隨機地址
const getRandomLocation = () => {
    const randomIndex = Math.floor(Math.random() * TAIPEI_LOCATIONS.length);
    return TAIPEI_LOCATIONS[randomIndex];
};

const DataForm = ({ onSubmit, onImageUpload }) => {
    const [formData, setFormData] = useState({
        deviceID: '',
        captureTime: '',
        captureLocation: '',
    });

    // 生成新的隨機數據
    const generateNewRandomData = () => {
        const now = new Date();
        const taipeiTime = now.toLocaleString('sv-SE', { 
            timeZone: 'Asia/Taipei',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(' ', 'T');

        return {
            deviceID: generateRandomDeviceId(),
            captureTime: taipeiTime,
            captureLocation: getRandomLocation(),
        };
    };

    // 初始化和更新表單數據
    useEffect(() => {
        setFormData(generateNewRandomData());
    }, []);

    // 處理文件上傳
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onImageUpload(file);
    };

    // 修改處理表單提交的函數
    const handleSubmit = (e) => {
        e.preventDefault();
        const newRandomData = generateNewRandomData();
        setFormData(newRandomData); // 更新顯示的數據
        onSubmit(newRandomData); // 提交新的隨機數據
    };

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
        }}>
            {/* 顯示自動生成的資訊 */}
            <div className="info-display" style={{
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '5px',
                marginBottom: '10px',
                border: '1px solid #ddd'
            }}>
                <p><strong>設備 ID：</strong> {formData.deviceID}</p>
                <p><strong>拍攝時間：</strong> {formData.captureTime.replace('T', ' ')}</p>
                <p><strong>拍攝地點：</strong> {formData.captureLocation}</p>
            </div>

            {/* 只保留圖片上傳功能 */}
            <label>
                上傳車牌圖像：
                <input 
                    type="file" 
                    name="uploadedImage" 
                    onChange={handleFileChange} 
                    required 
                    accept="image/*"
                />
            </label>
            
            <button type="submit" style={{
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
            }}>
                提交
            </button>
        </form>
    );
};

export default DataForm;