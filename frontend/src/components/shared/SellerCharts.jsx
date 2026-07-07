import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function SellerCharts({ reportType, analytics }) {
  if (reportType === "revenue") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={analytics.monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} />
          <Tooltip 
            cursor={{ fill: '#f9fafb' }}
            contentStyle={{ borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)', fontFamily: 'inherit' }}
            formatter={(value) => [`₹${value}`, "Revenue"]}
          />
          <Bar dataKey="revenue" fill="#0B5A42" radius={[6, 6, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={analytics.monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 600 }} allowDecimals={false} />
        <Tooltip 
          contentStyle={{ borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)', fontFamily: 'inherit' }}
          formatter={(value) => [value, "Bookings"]}
        />
        <Line type="monotone" dataKey="bookings" stroke="#0B5A42" strokeWidth={3} dot={{ strokeWidth: 2, r: 5, fill: '#fff', stroke: '#0B5A42' }} activeDot={{ r: 7, fill: '#0B5A42' }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
