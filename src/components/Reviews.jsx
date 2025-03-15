import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import "../styles/Reviews.css";

const Reviews = () => {
    // Define state variables for pagination
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalNos, setTotalNos] = useState(50); // Assuming 50 total entries
    const [startedNo, setStartedNo] = useState(1);
    const [endNo, setEndNo] = useState(pageSize);

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

    return (
        <div className="review-container">
            <div className="rw-header">
                <div className="rw-search">
                        <input type="text" placeholder="Search" />
                        <FaSearch className="search-icon" />
                    </div>
                        <select className="category">
                        <option value="">Category</option>
                        <option value="">Electronics</option>
                        <option value="">Fashion</option>
                        <option value="">Sports</option>
                        <option value="">Homeware</option>
                        </select>
                    <select className="product-type">
                        <option value="">Product Type</option>
                        <option value="">Phone/Tablet</option>
                        <option value="">Laptop/PC</option>
                        <option value="">Homeware</option>
                        <option value="">Kitchenware</option>
                        </select>
                    <button className="gen-report">Generate Report</button>
                </div>
            <table className="review-table">
            <thead>
                    <tr className="rw-body1">
                        <th>#</th>
                        <th>NAME</th>
                        <th>PRODUCT</th>
                        <th>PRODUCT TYPE</th>
                        <th>CATEGORY</th>
                        <th>ANOMALY</th>
                        <th>RATE</th>
                        <th>DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleReviews.map((review) => (
                        <tr key={review.id} className="rw-body2">
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
                                    fontSize:"0.7em",
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

            <div className="rw-footer">
                <div className="rw-page1">
                    {startedNo}-{endNo} from {totalNos}
                </div>
                <div className="rw-page2">
                    <div className="page-size"> Rows per Page:
                        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                        </select>
                    </div>
                    <div className="page-swal">
                        <FaChevronLeft /> {pageNo}/{Math.ceil(totalNos / pageSize)} <FaChevronRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;