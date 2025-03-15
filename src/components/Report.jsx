import { useNavigate } from "react-router-dom";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryArea, VictoryStack } from "victory";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { FaDownload, FaUndoAlt, FaStar } from "react-icons/fa";
import "../styles/Report.css";

const Report = () => {
    //bar chart
    const monthlyRatingsData = [
        { month: "Jan", consistent: 30, moderate: 15, outliers: 5 },
        { month: "Feb", consistent: 40, moderate: 20, outliers: 10 },
        { month: "Mar", consistent: 35, moderate: 25, outliers: 15 },
        { month: "Apr", consistent: 50, moderate: 30, outliers: 10 },
        { month: "May", consistent: 45, moderate: 20, outliers: 5 },
        { month: "Jun", consistent: 55, moderate: 25, outliers: 10 }
    ];

    // Sample data for the table
    const sampleReviews = [
        { id: 1, name: "John Doe", product: "iPhone 13", productType: "Phone/Tablet", category: "Electronics", anomaly: "Yes", rate: 5, date: "2025-03-10" },
        { id: 2, name: "Jane Smith", product: "Samsung Galaxy S22", productType: "Phone/Tablet", category: "Electronics", anomaly: "No", rate: 4, date: "2025-03-11" },
        { id: 3, name: "Alice Brown", product: "MacBook Air", productType: "Laptop/PC", category: "Electronics", anomaly: "Yes", rate: 3, date: "2025-03-12" },
        { id: 4, name: "Charlie Wilson", product: "Nike Shoes", productType: "Sports", category: "Fashion", anomaly: "No", rate: 2, date: "2025-03-13" },
        { id: 5, name: "David Lee", product: "Blender", productType: "Kitchenware", category: "Homeware", anomaly: "Yes", rate: 5, date: "2025-03-14" },
        { id: 6, name: "Emma Johnson", product: "Headphones", productType: "Electronics", category: "Electronics", anomaly: "No", rate: 4, date: "2025-03-15" },
        { id: 7, name: "Liam Martinez", product: "Backpack", productType: "Fashion", category: "Fashion", anomaly: "Yes", rate: 3, date: "2025-03-16" },
        { id: 8, name: "Sophia Davis", product: "Tennis Racket", productType: "Sports", category: "Sports", anomaly: "No", rate: 5, date: "2025-03-17" },
        { id: 9, name: "William Brown", product: "Smart TV", productType: "Electronics", category: "Electronics", anomaly: "Yes", rate: 2, date: "2025-03-18" },
        { id: 10, name: "Olivia Wilson", product: "Sofa Set", productType: "Homeware", category: "Homeware", anomaly: "No", rate: 4, date: "2025-03-19" }
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


    //Area Graph
    const areaData = [
        { month: "Jan", ratings: 50, anomalies: 10 },
        { month: "Feb", ratings: 100, anomalies: 15 },
        { month: "Mar", ratings: 150, anomalies: 20 },
        { month: "Apr", ratings: 200, anomalies: 30 },
        { month: "May", ratings: 100, anomalies: 20 },
        { month: "Jun", ratings: 150, anomalies: 25 },
    ];

    //map
    const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
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

    const navigate = new useNavigate();

    return (
        <div className="report-container">
            <div className="rep1">
                <h1>Trends and Analysis of Ratings in January 2025</h1>
            </div>
            <div className="rep2">
                <div className="rep-bar">
                    <div className="r-rating-bar">
                        {/* Bar Chart */}
                        <div className="r-bar-container">
                            <h2 className="ch-topic">Ratings Patterns and Anomalies</h2>
                            <div className="r-rate-def">
                                <div className="r-def">
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
                            <div className="r-bar-chart">
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
                </div>
                <div className="rep-list">
                    <table className="rep-table">
                        <thead className="r-rw-body1">
                            <th>#</th>
                            <th>NAME</th>
                            <th>PRODUCT</th>
                            <th>PRODUCT TYPE</th>
                            <th>CATEGORY</th>
                            <th>ANOMALY</th>
                            <th>RATE</th>
                            <th>DATE</th>
                        </thead>
                        <tbody>
                            {sampleReviews.map((review) => (
                                <tr key={review.id} className="r-rw-body2">
                                    <td>{review.id}</td>
                                    <td>{review.name}</td>
                                    <td>{review.product}</td>
                                    <td>{review.productType}</td>
                                    <td>{review.category}</td>
                                    <td
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "30px",
                                            height: "15px",
                                            backgroundColor: review.anomaly === "Yes" ? "rgba(0, 128, 0, 0.2)" : "rgba(255, 0, 0, 0.2)", // Transparent fill
                                            color: review.anomaly === "Yes" ? "darkgreen" : "darkred",
                                            borderRadius: "50px",
                                            fontSize: "0.7em",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {review.anomaly}
                                    </td>
                                    <td>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <FaStar
                                                key={index}
                                                color={index < review.rate ? "gold" : "lightgray"}
                                            />
                                        ))}
                                    </td>
                                    <td>{review.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="rep3">
                <div className="rep-area">

                    <div className="r-rating-area">
                        <h2 className="ch-topic">Ratings and Anomalies Trend</h2>
                        <div className="r-area-def">
                            <div className="r-area-chart">
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
                <div className="rep-map">

                    <div className="r-rating-map">
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
                <div className="rep-btn">
                    <button className="download"><FaDownload /> Download</button>
                    <button className="return" onClick={() => navigate('/reviews')} ><FaUndoAlt /> Return</button>
                    <div className="logo">
                        <h1>Rateintel</h1><h1 className="h1-section1">.</h1>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Report;