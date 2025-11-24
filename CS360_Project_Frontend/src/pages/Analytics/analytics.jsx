import React, { useEffect, useState } from "react";
import routed_connectors from "../../components/Connector/connector";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area} from "recharts";
import "./analytics.scss"
export default function Analytics(){
const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await routed_connectors.get_analytics_data();
      setData(res);
    }
    load();
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  const { avg_rating_per_category, popularity_scores, page_counts } = data;

  const histogramBins = {};
  page_counts.forEach((p) => {
    const bin = Math.floor(p / 50) * 50;
    histogramBins[bin] = (histogramBins[bin] || 0) + 1;
  });

  const histogramData = Object.entries(histogramBins).map(([range, count]) => ({
    range: `${range}-${Number(range) + 49}`,
    count,
  }));

  return (
    <div className="analytics-page">
      <h1>Book Analytics Dashboard</h1>

      <section className="chart-container">
        <h2>Average Rating per Category</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={avg_rating_per_category}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" hide={false} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="average_rating" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="chart-container">
        <h2>Book Popularity Score</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={popularity_scores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" hide={true} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="popularity"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="chart-container">
        <h2>Page Count Distribution (Histogram)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={histogramData}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#ffc658"
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}