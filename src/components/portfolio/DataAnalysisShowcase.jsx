import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity, Database, Filter } from 'lucide-react';

export default function DataAnalysisShowcase({ isDark }) {
  const [activeTab, setActiveTab] = useState('sales');

  // Sample data for Sales Analysis
  const salesData = useMemo(() => [
    { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000, orders: 234 },
    { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000, orders: 267 },
    { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000, orders: 245 },
    { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000, orders: 312 },
    { month: 'May', revenue: 58000, expenses: 36000, profit: 22000, orders: 298 },
    { month: 'Jun', revenue: 67000, expenses: 40000, profit: 27000, orders: 345 },
    { month: 'Jul', revenue: 72000, expenses: 42000, profit: 30000, orders: 367 },
    { month: 'Aug', revenue: 69000, expenses: 41000, profit: 28000, orders: 354 },
    { month: 'Sep', revenue: 75000, expenses: 43000, profit: 32000, orders: 389 },
    { month: 'Oct', revenue: 81000, expenses: 45000, profit: 36000, orders: 412 },
    { month: 'Nov', revenue: 78000, expenses: 44000, profit: 34000, orders: 398 },
    { month: 'Dec', revenue: 85000, expenses: 47000, profit: 38000, orders: 435 },
  ], []);

  // Sample data for Customer Segmentation
  const customerSegments = useMemo(() => [
    { name: 'Enterprise', value: 45, customers: 125 },
    { name: 'SMB', value: 30, customers: 450 },
    { name: 'Startup', value: 15, customers: 320 },
    { name: 'Individual', value: 10, customers: 890 },
  ], []);

  // Sample data for Product Performance
  const productData = useMemo(() => [
    { product: 'Product A', sales: 12500, growth: 15, satisfaction: 4.5 },
    { product: 'Product B', sales: 9800, growth: 8, satisfaction: 4.2 },
    { product: 'Product C', sales: 15200, growth: 22, satisfaction: 4.7 },
    { product: 'Product D', sales: 7600, growth: -3, satisfaction: 3.9 },
    { product: 'Product E', sales: 11300, growth: 12, satisfaction: 4.4 },
  ], []);

  // Sample data for Regional Analysis
  const regionalData = useMemo(() => [
    { region: 'North', revenue: 250000, marketShare: 32 },
    { region: 'South', revenue: 180000, marketShare: 23 },
    { region: 'East', revenue: 220000, marketShare: 28 },
    { region: 'West', revenue: 130000, marketShare: 17 },
  ], []);

  const COLORS = isDark 
    ? ['#a855f7', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']
    : ['#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626'];

  const tabs = [
    { id: 'sales', label: 'Sales Trends', icon: TrendingUp },
    { id: 'segments', label: 'Customer Segments', icon: PieChartIcon },
    { id: 'products', label: 'Product Performance', icon: BarChart3 },
    { id: 'regional', label: 'Regional Analysis', icon: Activity },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-xl ${
          isDark ? 'bg-[#141225] border border-purple-500/30' : 'bg-white border border-[#244270]/20'
        } shadow-xl`}>
          <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-[#141225]'}`}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'sales':
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-xl ${isDark ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'}`}
              >
                <p className={`text-xs mb-1 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Total Revenue</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                  ${salesData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                </p>
                <p className="text-xs text-green-500 mt-1">↑ 18.5% YoY</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className={`p-4 rounded-xl ${isDark ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-cyan-50 border border-cyan-200'}`}
              >
                <p className={`text-xs mb-1 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>Total Orders</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                  {salesData.reduce((sum, item) => sum + item.orders, 0).toLocaleString()}
                </p>
                <p className="text-xs text-green-500 mt-1">↑ 12.3% YoY</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className={`p-4 rounded-xl ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}
              >
                <p className={`text-xs mb-1 ${isDark ? 'text-green-400' : 'text-green-700'}`}>Avg Profit Margin</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                  {((salesData.reduce((sum, item) => sum + item.profit, 0) / salesData.reduce((sum, item) => sum + item.revenue, 0)) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-green-500 mt-1">↑ 2.1% YoY</p>
              </motion.div>
            </div>

            <div className="h-80">
              <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                Revenue vs Expenses Trend
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isDark ? '#a855f7' : '#7c3aed'} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={isDark ? '#a855f7' : '#7c3aed'} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isDark ? '#ef4444' : '#dc2626'} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={isDark ? '#ef4444' : '#dc2626'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                  <XAxis dataKey="month" stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} />
                  <YAxis stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke={isDark ? '#a855f7' : '#7c3aed'} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                  <Area type="monotone" dataKey="expenses" stroke={isDark ? '#ef4444' : '#dc2626'} fillOpacity={1} fill="url(#colorExpenses)" name="Expenses" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'segments':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-80">
              <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                Revenue by Segment
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                Customer Distribution
              </h4>
              {customerSegments.map((segment, index) => (
                <motion.div
                  key={segment.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-[#244270]/5'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-[#141225]'}`}>{segment.name}</span>
                    <span className={`text-sm ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                      {segment.customers} customers
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: COLORS[index], width: `${segment.value}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${segment.value}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-8">
            <div className="h-80">
              <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                Product Sales Comparison
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                  <XAxis dataKey="product" stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} />
                  <YAxis stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sales" fill={isDark ? '#a855f7' : '#7c3aed'} radius={[8, 8, 0, 0]} name="Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="h-80">
              <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                Growth vs Satisfaction
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                  <XAxis type="number" dataKey="growth" name="Growth" unit="%" stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} />
                  <YAxis type="number" dataKey="satisfaction" name="Satisfaction" domain={[0, 5]} stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} />
                  <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter data={productData} fill={isDark ? '#06b6d4' : '#0891b2'} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'regional':
        return (
          <div className="space-y-8">
            <div className="h-80">
              <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                Regional Revenue Distribution
              </h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                  <XAxis type="number" stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} />
                  <YAxis dataKey="region" type="category" stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" fill={isDark ? '#10b981' : '#059669'} radius={[0, 8, 8, 0]} name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {regionalData.map((region, index) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl text-center ${isDark ? 'bg-white/5 border border-white/10' : 'bg-[#244270]/5 border border-[#244270]/10'}`}
                >
                  <p className={`text-xs mb-1 ${isDark ? 'text-white/50' : 'text-[#141225]/50'}`}>{region.region}</p>
                  <p className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
                    ${(region.revenue / 1000).toFixed(0)}K
                  </p>
                  <p className={`text-xs ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    {region.marketShare}% share
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-black/40 border border-purple-500/20' 
          : 'bg-white/60 border border-[#244270]/10'
      } backdrop-blur-xl`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-[#244270]/10'}`}>
          <Database className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-[#244270]'}`} />
        </div>
        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#141225]'}`}>
          Interactive Data Analysis
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === tab.id
                ? isDark
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                  : 'bg-gradient-to-r from-[#244270] to-[#4dbdce] text-white'
                : isDark
                ? 'bg-white/5 text-white/70 hover:bg-white/10'
                : 'bg-[#244270]/5 text-[#141225]/70 hover:bg-[#244270]/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </motion.div>
  );
}