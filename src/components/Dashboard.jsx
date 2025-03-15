import React, { useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryArea, VictoryStack, VictoryLine } from "victory";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { FaArrowUp, FaArrowDown, FaStar, FaStarHalfAlt, FaRegStar, FaChevronDown, FaChevronUp } from "react-icons/fa"
import "../styles/Dashboard.css";


const feedbacks = [
  { rating: 4.5, text: "Great service and fast response!", author: "John Peterson" },
  { rating: 5, text: "Excellent experience, highly recommended!", author: "John Peterson" },
  { rating: 3.5, text: "Good but can be improved in some areas.", author: "John Peterson" },
  { rating: 4, text: "Very helpful support team!", author: "John Peterson" },
  { rating: 2.5, text: "Needs improvement in customer service.", author: "John Peterson" },
  { rating: 5, text: "Perfect! Couldn't ask for better service.", author: "John Peterson" },
];

const avgRating = (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1);
const totalRatingCount = "62,250";

const StarRating = ({ rating }) => {
  let stars = [];
  let roundedRating = Math.floor(rating);
  let hasHalfStar = rating - roundedRating >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < roundedRating) {
      stars.push(<FaStar key={i} color="gold" />);
    } else if (hasHalfStar && i === roundedRating) {
      stars.push(<FaStarHalfAlt key={i} color="gold" />);
    } else {
      stars.push(<FaRegStar key={i} color="gray" />);
    }
  }

  return <div>{stars}</div>;
};

const ratingDistribution = [
  { rating: 1, percentage: 5 },
  { rating: 2, percentage: 10 },
  { rating: 3, percentage: 20 },
  { rating: 4, percentage: 30 },
  { rating: 5, percentage: 35 },
];

//for the map
const countryRatings = {
  USA: 5000,
  Canada: 3000,
  UK: 4500,
  Germany: 2000,
  France: 3500,
  India: 6000,
  China: 7000,
  Brazil: 4000,
};

const minRating = Math.min(...Object.values(countryRatings));
const maxRating = Math.max(...Object.values(countryRatings));

const colorScale = scaleLinear()
  .domain([minRating, maxRating])
  .range(["#f0f0f0", "#ff8404"]);

const Dashboard = () => {
  const monthlyRatingsData = [
    { month: "Jan", consistent: 30, moderate: 15, outliers: 5 },
    { month: "Feb", consistent: 40, moderate: 20, outliers: 10 },
    { month: "Mar", consistent: 35, moderate: 25, outliers: 15 },
    { month: "Apr", consistent: 50, moderate: 30, outliers: 10 },
    { month: "May", consistent: 45, moderate: 20, outliers: 5 },
    { month: "Jun", consistent: 55, moderate: 25, outliers: 10 }
  ];

  // Get last two months' data
  const lastMonth = monthlyRatingsData[monthlyRatingsData.length - 2]; // May
  const currentMonth = monthlyRatingsData[monthlyRatingsData.length - 1]; // Jun
  const lastMonthTotal = lastMonth.consistent + lastMonth.moderate + lastMonth.outliers;
  const currentMonthTotal = currentMonth.consistent + currentMonth.moderate + currentMonth.outliers;
  const percentageChange1 = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
  const isIncrease = percentageChange1 > 0;

  const anomaliesData = [10, 15, 20, 30, 20, 25]; // Monthly anomaly ratings
  const currentAnomalies = anomaliesData[anomaliesData.length - 1]; // Latest value
  const previousAnomalies = anomaliesData[anomaliesData.length - 2]; // Previous month value
  const percentageChange = ((currentAnomalies - previousAnomalies) / previousAnomalies) * 100;

  const areaData = [
    { month: "Jan", ratings: 50, anomalies: 10 },
    { month: "Feb", ratings: 100, anomalies: 15 },
    { month: "Mar", ratings: 150, anomalies: 20 },
    { month: "Apr", ratings: 200, anomalies: 30 },
    { month: "May", ratings: 100, anomalies: 20 },
    { month: "Jun", ratings: 150, anomalies: 25 },
  ];

  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <div className="dash1">
        <div className="rating-bar">
          {/* Bar Chart */}
          <div className="bar-container">
            <h2 className="ch-topic">Ratings Patterns and Anomalies</h2>
            <div className="rate-def">
              <div className="def">
                <div className="color1"></div>
                <p>Consistant Ratings</p>
              </div>
              <div className="def">
                <div className="color2"></div>
                <p>Moderate Ratings</p>
              </div>
              <div className="def">
                <div className="color3"></div>
                <p>Protential Outliers</p>
              </div>
            </div>
            <div className="bar-chart">
              <VictoryChart width={1200} height={500} domainPadding={50} theme={VictoryTheme.material}>
                <VictoryAxis tickValues={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} label="Month" />
                <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}K`} label="Ratings Count (K)" />
                <VictoryStack colorScale={["#ff8404", "#ffb404", "#ffe0b0"]}>
                  <VictoryBar data={monthlyRatingsData} x="month" y="consistent" />
                  <VictoryBar data={monthlyRatingsData} x="month" y="moderate" />
                  <VictoryBar data={monthlyRatingsData} x="month" y="outliers" />
                </VictoryStack>
              </VictoryChart>
            </div>
          </div>
        </div>
        <div className="rating-percent">
          <div className="positive-rating">
            <h1>{currentMonthTotal}%</h1>
            <p>Positive Rating</p>
            <div className="rt1">
              <div className="rt-cont" style={{ color: isIncrease ? "green" : "red" }}>
                {isIncrease ? <FaArrowUp /> : <FaArrowDown />}{Math.abs(percentageChange1).toFixed(2)}%</div>
              <p>Since last months</p>
            </div>
          </div>
          <div className="anomalies-rating">
            <h1>47%</h1>
            <p>Anomalies in Rating</p>
            <div className="rt1">
              <div className="rt-cont" style={{ color: isIncrease ? "green" : "red" }}>
                {isIncrease ? <FaArrowUp /> : <FaArrowDown />}{Math.abs(percentageChange).toFixed(2)}%</div>
              <p>Since last year</p>
            </div>
          </div>
        </div>
        <div className="rating-area">
          <h2 className="ch-topic">Ratings and Anomalies Trend</h2>
          <div className="area-def">
            <div className="area-chart">
              <VictoryChart width={800} height={300} theme={VictoryTheme.material} className="victory-chart">
                <svg style={{ position: "absolute", width: 0, height: 0 }}>
                  <defs>
                    <linearGradient id="ratingsGradient1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#000" />
                      <stop offset="50%" stopColor="#848484" />
                      <stop offset="100%" stopColor="#rgba" />
                    </linearGradient>
                  </defs>
                  <defs>
                    <linearGradient id="ratingsGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff8404" />
                      <stop offset="50%" stopColor="#ffb404" />
                      <stop offset="100%" stopColor="#ffe0b0" />
                    </linearGradient>
                  </defs>
                </svg>

                <VictoryAxis tickValues={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} />
                <VictoryAxis dependentAxis />
                <VictoryArea data={areaData} x="month" y="ratings" style={{ data: { fill: "url(#ratingsGradient1)", opacity: 0.4 } }} />
                <VictoryArea data={areaData} x="month" y="anomalies" style={{ data: { fill: "url(#ratingsGradient2)", opacity: 0.7 } }} />
              </VictoryChart>
            </div>
            <div className="a1">
              <div className="def2">
                <div className="color4"></div>
                <p>Rating</p>
              </div>
              <div className="def2">
                <div className="color5"></div>
                <p>Anomalies</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="dash2">
        <div className="rating-sum">
          <div className="sum-drop">
            <div>
              <select className="category">
                <option value="">Category</option>
                <option value="">Electronics</option>
                <option value="">Fashion</option>
                <option value="">Sports</option>
                <option value="">Homeware</option>
              </select>
            </div>
            <div>
              <select className="product-type">
                <option value="">Product Type</option>
                <option value="">Phone/Tablet</option>
                <option value="">Laptop/PC</option>
                <option value="">Homeware</option>
                <option value="">Kitchenware</option>
              </select>
            </div>
          </div>
          <div className="rating-anlyze">
            <div className="rating">
              <h1>{avgRating}</h1>
              <div className="tp">
                <div className="start">  <StarRating rating={avgRating} /> </div>
                <p>Based on {totalRatingCount} Ratings</p>
              </div>
            </div>
            <div className="bar-rep">
              <div className="full-bar"></div>
              {ratingDistribution.map((rate) => (
                <div key={rate.rating} className="rating-bar-wrapper">
                  <div className="rating-label">
                    <p className="star-rate">{rate.rating}★</p>
                    <p className="star-percentage">{rate.percentage}%</p>
                  </div>

                  <div className="rating-bar-overlay">
                    <div
                      className="rating-bar-fill"
                      style={{ width: `${rate.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="show-summery">
            <button onClick={() => setIsOpen(!isOpen)}>
              Show Summary {isOpen ? <FaChevronUp className="arw-btn" /> : <FaChevronDown className="arw-btn" />}
            </button>
            {isOpen && (
              <div className="txt-msg">
                <p>This is the summary message.</p>
              </div>
            )}
          </div>
        </div>


        <div className="rating-map">
          <h2>Ratings by Country</h2>
          <ComposableMap>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.NAME;
                  const ratingCount = countryRatings[countryName] || 0;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={ratingCount ? colorScale(ratingCount) : "#E0E0E0"} // Default gray if no data
                      stroke="#000"
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

      </div>



      {/* Bar Chart */}
      {/* <div className="card">
        <h2>Ratings Distribution</h2>
        <VictoryChart domainPadding={20} theme={VictoryTheme.material} className="victory-chart">
          <VictoryAxis tickValues={["1★", "2★", "3★", "4★", "5★"]} />
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={barData}
            x="rating"
            y="count"
            style={{ data: { fill: "#1f77b4" } }} // Blue bars
          />
        </VictoryChart>
      </div>

      {/* Area Chart */}
      {/* <div className="card">
        <h2>Ratings and Anomalies Trend</h2>
        <VictoryChart theme={VictoryTheme.material} className="victory-chart">
          <VictoryAxis tickValues={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} /> 
          <VictoryAxis dependentAxis />
          <VictoryArea data={areaData} x="month" y="ratings" style={{ data: { fill: "#1f77b4", opacity: 0.3 } }} />
          <VictoryArea data={areaData} x="month" y="anomalies" style={{ data: { fill: "#ff7f0e", opacity: 0.5 } }} />
        </VictoryChart>
      </div> */}

      {/* Map */}
      {/* <div className="card map-container">
        <h2>Ratings by Region</h2>
        <ComposableMap projectionConfig={{ scale: 120 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} className="geography" />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div> */}
    </div>
  );
};

export default Dashboard;
