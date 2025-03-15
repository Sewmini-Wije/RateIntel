import { React, useState } from "react";
import "../styles/Home.css";
import { FaStar, FaRegStar, FaStarHalfAlt, FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import section2 from "../img/section2.png";
import s2icon1 from "../img/s2-icon1.png";
import s2icon2 from "../img/s2-icon2.png";
import s2icon3 from "../img/s2-icon3.png";
import s2icon4 from "../img/s2-icon4.png";
import s2icon5 from "../img/s2-icon5.png";
import s2icon6 from "../img/s2-icon6.png";
import quotes from "../img/quotes.png";
import { useNavigate } from "react-router-dom";

const feedbacks = [
    { rating: 4.5, text: "Great service and fast response!", author: "John Peterson" },
    { rating: 5, text: "Excellent experience, highly recommended!", author: "John Peterson" },
    { rating: 3.5, text: "Good but can be improved in some areas.", author: "John Peterson" },
    { rating: 4, text: "Very helpful support team!", author: "John Peterson" },
    { rating: 2.5, text: "Needs improvement in customer service.", author: "John Peterson" },
    { rating: 5, text: "Perfect! Couldn't ask for better service.", author: "John Peterson" },
];

const avgRating = (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1);

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

const FeedbackCarousel = () => {
    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        setIndex((prev) => (prev + 2) % feedbacks.length);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev - 2 + feedbacks.length) % feedbacks.length);
    };

    return (
        <div className="carousel-container">
            <div className="carousel">
                <div className="half-box left" onClick={prevSlide}>
                    <h3>{feedbacks[(index - 2 + feedbacks.length) % feedbacks.length].text}</h3>
                </div>

                {feedbacks.slice(index, index + 2).map((feedback, i) => (
                    <div key={i} className="feedback-box">
                        <img src={quotes} alt="quotes" />
                        <div className="feedback-align">
                            <h3>{feedback.text}</h3>
                            <div className="author">
                                <div className="author-ln"></div>
                                <p>{feedback.author}</p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="half-box right" onClick={nextSlide}>
                    <h3>{feedbacks[(index + 2) % feedbacks.length].text}</h3>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <section className="section1">
                <div className="section1-head">
                    <div className="logo">
                        <h1>Rateintel</h1><h1 className="h1-section1">.</h1>
                    </div>
                    <button className="login" onClick={() => navigate("/login")} >Login</button>
                </div>
                <div className="section1-body">
                    <p>Turning Feedback into Opportunities for Growth.</p>
                    <button className="explore-btn">Explore</button>
                </div>
            </section>

            <section id="aboutUs" className="section2">
                <div className="text-container">
                    Built with Trust
                    <div className="text-overlay">
                        Designed for Growth
                        <div className="img-overlay">
                            <img src={section2} alt="section2" />

                            <div className="box top-left">
                                <img src={s2icon6} alt="icon6" />
                                <h5>Fast & Intutive</h5>
                                <p>Visualize customer trends and analyze data anomalies with just a few clicks.</p>
                            </div>
                            <div className="box top-right">
                                <img src={s2icon1} alt="icon6" />
                                <h5>Enhanced Trust</h5>
                                <p>Build a better platform by learning directly from your customers.</p>
                            </div>
                            <div className="box bottom-left">
                                <img src={s2icon5} alt="icon6" />
                                <h5>Accurate Insights</h5>
                                <p>Trust in precise analytics powered by machine learning and modern algorithms.</p>
                            </div>
                            <div className="box bottom-right">
                                <img src={s2icon2} alt="icon6" />
                                <h5>Global Satandards</h5>
                                <p>Craft strategies that resonate with both local and global audiences.</p>
                            </div>

                            <div className="box below-left">
                                <div className="box-spc">
                                    <h5>Actionable Recommendations</h5>
                                    <img src={s2icon4} alt="icon6" />
                                </div>
                                <p>turn data into action with automated improvement strategies.</p>
                            </div>
                            <div className="box below-right">
                                <div className="box-spc">
                                    <img src={s2icon3} alt="icon6" />
                                    <h5>Always Improving</h5>
                                </div>
                                <p>Constant feedback helps us to improve to keep you ahead.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section3">
                <div className="section3-head">
                    <h1>{avgRating}</h1>
                    <h1>  <StarRating rating={avgRating} /> </h1>
                </div>

                <div className="secction3-body">
                    <FeedbackCarousel />
                </div>
            </section>

            <section className="section4">
                <div className="section4-head">
                    <div class="community" >
                        <h3> Join Our Community </h3>
                        <p>Join us in ttransforming the way e-commerce success is measured-your ratingd, our insights, better business, decisions.</p>
                    </div>
                </div>
                <footer>
                    <div className="about">
                        <p>FAQs</p>
                        <p onClick={() => document.getElementById("aboutUs").scrollIntoView({ behavior: "smooth" })} style={{ cursor: "pointer" }} >About RateIntel</p>
                    </div>
                    <div className="contact">
                        <h2>Contact</h2>
                        <p>Email: help@rateintel.com</p>
                        <p>Location: Colombo, LK</p>

                        <div className="social-media">
                            <FaInstagram size={25} />
                            <FaTwitter size={25} />
                            <FaFacebook size={25} />
                            <FaYoutube size={25} />
                            <FaTiktok size={25} />
                        </div>
                    </div>
                    <div className="info">
                        <div className="logo">
                            <h1>Rateintel</h1><h1 className="h1-section1">.</h1>
                        </div>
                        <p>&#169; RateIntel, all rights reserved.</p>
                    </div>
                </footer>
            </section>
        </div>
    );
}

export default Home;