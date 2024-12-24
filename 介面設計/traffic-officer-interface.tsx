import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

// 交通佐理員違規審核介面

const TrafficOfficerInterface = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  // 模擬待審核案件
  const cases = [
    {
      id: 'V2024030001',
      time: '2024-03-11 14:30:22',
      location: '中正路段198號',
      type: '超速',
      status: 'pending',
      confidence: 0.75,
      images: ['/api/placeholder/640/360']
    },
    {
      id: 'V2024030002',
      time: '2024-03-11 14:35:15',
      location: '中山路段87號',
      type: '闖紅燈',
      status: 'pending',
      confidence: 0.68,
      images: ['/api/placeholder/640/360']
    }
  ];

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="grid grid-cols-12 gap-4">
        {/* 左側案件列表 */}
        <div className="col-span-4">
          <Card>
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">待審核案件</h2>
                <Badge variant="secondary">待處理: {cases.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {cases.map(caseItem => (
                  <div 
                    key={caseItem.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedCase?.id === caseItem.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedCase(caseItem)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{caseItem.id}</p>
                        <p className="text-sm text-gray-500">{caseItem.time}</p>
                        <p className="text-sm text-gray-600">{caseItem.location}</p>
                      </div>
                      <Badge variant={caseItem.confidence > 0.7 ? "success" : "warning"}>
                        {Math.round(caseItem.confidence * 100)}% 信心度
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右側審核區域 */}
        <div className="col-span-8">
          <Card>
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  {selectedCase ? `案件審核 - ${selectedCase.id}` : '請選擇案件'}
                </h2>
                {selectedCase && (
                  <div className="flex gap-2">
                    <Button variant="destructive" className="gap-2">
                      <XCircle size={16} />
                      駁回
                    </Button>
                    <Button variant="default" className="gap-2">
                      <CheckCircle2 size={16} />
                      確認違規
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedCase ? (
                <Tabs defaultValue="images">
                  <TabsList>
                    <TabsTrigger value="images">違規影像</TabsTrigger>
                    <TabsTrigger value="details">案件詳情</TabsTrigger>
                    <TabsTrigger value="history">車輛紀錄</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="images" className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <img 
                        src={selectedCase.images[0]} 
                        alt="違規影像"
                        className="w-full rounded-lg shadow"
                      />
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium mb-2">AI 辨識結果</h3>
                          <ul className="space-y-2 text-sm">
                            <li>違規類型：{selectedCase.type}</li>
                            <li>信心度：{selectedCase.confidence * 100}%</li>
                            <li>拍攝時間：{selectedCase.time}</li>
                            <li>地點：{selectedCase.location}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-4">詳細資訊</h3>
                      <div className="space-y-4">
                        {/* 這裡可以放更多詳細資訊 */}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-4">歷史違規紀錄</h3>
                      {/* 這裡可以放歷史違規紀錄 */}
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <AlertCircle size={48} className="mb-4" />
                  <p>請從左側選擇要審核的案件</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrafficOfficerInterface;
