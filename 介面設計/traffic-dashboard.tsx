import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar } from "@/components/ui/calendar";
import { MapPin, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

// 交通違規管理儀表板

const TrafficDashboard = () => {
  // 模擬數據
  const violationData = [
    { month: '1月', 超速: 420, 闖紅燈: 350, 違停: 280 },
    { month: '2月', 超速: 380, 闖紅燈: 320, 違停: 290 },
    { month: '3月', 超速: 450, 闖紅燈: 380, 違停: 310 }
  ];

  const areaData = [
    { area: '中正區', count: 245, rate: 12 },
    { area: '信義區', count: 189, rate: -8 },
    { area: '大安區', count: 321, rate: 15 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 頂部統計卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">今日違規總數</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">處理完成率</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-yellow-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">待處理案件</p>
                <p className="text-2xl font-bold">328</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-100 rounded-full">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">違規熱點數</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要內容區 */}
      <div className="grid grid-cols-3 gap-4">
        {/* 左側圖表 */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>違規趨勢分析</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={violationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="超速" stroke="#8884d8" />
                <Line type="monotone" dataKey="闖紅燈" stroke="#82ca9d" />
                <Line type="monotone" dataKey="違停" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 右側區域分析 */}
        <Card>
          <CardHeader>
            <CardTitle>區域分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {areaData.map((area) => (
                <div key={area.area} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{area.area}</p>
                    <span className={`text-sm ${area.rate > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {area.rate > 0 ? '+' : ''}{area.rate}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold mt-2">{area.count}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(area.count / 400) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 底部違規類型分析 */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>違規類型分析</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chart">
              <TabsList>
                <TabsTrigger value="chart">圖表視圖</TabsTrigger>
                <TabsTrigger value="list">列表視圖</TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={violationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="超速" fill="#8884d8" />
                    <Bar dataKey="闖紅燈" fill="#82ca9d" />
                    <Bar dataKey="違停" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="list">
                <div className="space-y-4">
                  {violationData.map((data, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-2">{data.month}</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">超速</p>
                          <p className="text-lg font-bold">{data.超速}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">闖紅燈</p>
                          <p className="text-lg font-bold">{data.闖紅燈}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">違停</p>
                          <p className="text-lg font-bold">{data.違停}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrafficDashboard;
