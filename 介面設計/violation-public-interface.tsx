import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, CreditCard, AlertCircle } from 'lucide-react';

// 違規民眾查詢頁面

const ViolationPublicInterface = () => {
  const [searchType, setSearchType] = useState('plate');
  
  // 模擬違規紀錄
  const violationRecord = {
    id: "V2024030001",
    plateNumber: "ABC-1234",
    date: "2024-03-11",
    time: "14:30:22",
    location: "中正路段198號",
    type: "超速",
    speed: "75 km/h",
    speedLimit: "50 km/h",
    fine: 2400,
    status: "未繳費",
    dueDate: "2024-04-10"
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 頂部查詢區 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>違規紀錄查詢</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="plate" onValueChange={setSearchType}>
            <TabsList>
              <TabsTrigger value="plate">車牌號碼查詢</TabsTrigger>
              <TabsTrigger value="ticket">違規單號查詢</TabsTrigger>
              <TabsTrigger value="id">身分證號查詢</TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <div className="flex gap-4">
                <Input 
                  placeholder={
                    searchType === 'plate' ? '請輸入車牌號碼' :
                    searchType === 'ticket' ? '請輸入違規單號' :
                    '請輸入身分證號'
                  }
                  className="flex-1"
                />
                <Button className="gap-2">
                  <Search className="w-4 h-4" />
                  查詢
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* 違規詳情 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>違規詳細資訊</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-lg mb-4">基本資訊</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">違規單號</span>
                  <span>{violationRecord.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">車牌號碼</span>
                  <span>{violationRecord.plateNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">違規日期</span>
                  <span>{violationRecord.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">違規時間</span>
                  <span>{violationRecord.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">違規地點</span>
                  <span>{violationRecord.location}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-4">違規內容</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">違規類型</span>
                  <span>{violationRecord.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">行駛速度</span>
                  <span>{violationRecord.speed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">速限</span>
                  <span>{violationRecord.speedLimit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">罰鍰金額</span>
                  <span className="text-red-500 font-medium">
                    NT$ {violationRecord.fine}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">繳費期限</span>
                  <span className="text-red-500">{violationRecord.dueDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 條碼和印章區域 */}
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="border-2 border-gray-800 p-4 mb-2">
                  <img 
                    src="/api/placeholder/200/80" 
                    alt="違規單條碼"
                    className="w-48"
                  />
                </div>
                <p className="text-sm text-gray-500">違規單條碼</p>
              </div>

              <div className="text-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border-2 border-red-500 rounded-full flex items-center justify-center">
                      <div className="text-center text-red-500">
                        <p className="text-sm">桃園市政府</p>
                        <p className="text-sm">警察局</p>
                        <p className="text-sm">交通隊</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-8 flex items-center justify-center">
                    <p className="text-xs text-red-500">中華民國112年</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 操作按鈕 */}
          <div className="flex gap-4 mt-6">
            <Button variant="outline" className="flex-1 gap-2">
              <FileText className="w-4 h-4" />
              列印違規單
            </Button>
            <Button className="flex-1 gap-2">
              <CreditCard className="w-4 h-4" />
              立即繳費
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 法規提示 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-yellow-800">法律效力說明</h4>
            <p className="text-sm text-yellow-700 mt-1">
              本違規通知單及條碼具有法律效力，可用於繳費及相關證明。偽造、變造或冒用者，將依法究辦。
            </p>
          </div>
        </div>
      </div>

      {/* 說明區域 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-medium">注意事項</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 繳費期限截止後將產生額外滯納金</li>
                <li>• 如對違規認定有疑義，請於期限內提出申訴</li>
                <li>• 可下載違規影像作為存證</li>
                <li>• 如有疑問請撥打服務專線：0800-XXX-XXX</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViolationPublicInterface;