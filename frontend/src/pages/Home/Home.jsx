import React from "react";
import Hero from "../../components/Hero/Hero";
import Card from "../../components/Card/Card";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();

  const featureCards = [
    {
      title: "Assignment Upload",
      desc: "Upload assignments with drag & drop or file select.",
      features: ["Drag & Drop", "Multiple Formats", "Easy Access"],
      tags: ["New"],
      progress: 70,
      actionLabel: "Upload Now",
      onAction: () => alert("Redirecting to Assignment Upload"),
    },
    {
      title: "Auto Evaluation",
      desc: "Inline feedback and quick grading workflow.",
      features: ["Instant Feedback", "Auto Grading", "Detailed Reports"],
      tags: ["Popular"],
      progress: 85,
      actionLabel: "Check Now",
      onAction: () => alert("Redirecting to Evaluation"),
    },
    {
      title: "Peer Review",
      desc: "Invite classmates to review and comment on submissions.",
      features: ["Collaborative", "Comments", "Track Changes"],
      tags: ["Interactive"],
      progress: 60,
      actionLabel: "Review Now",
      onAction: () => alert("Redirecting to Peer Review"),
    },
    {
      title: "Profile & Tracking",
      desc: "Track submissions, grades and history.",
      features: ["Dashboard", "Performance Reports", "History Logs"],
      tags: ["Essential"],
      progress: 90,
      actionLabel: "View Profile",
      onAction: () => navigate("/login"),
    },
    {
      title: "Course Library",
      desc: "Access all your courses in one place.",
      features: ["PDFs", "Videos", "Downloadable"],
      tags: ["Top Rated"],
      progress: 80,
      actionLabel: "View Courses",
      onAction: () => navigate("/features"),
    },
  ];

  // Auto-playing carousel settings
  const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "60px",
  autoplay: true,        // enable auto scroll
  autoplaySpeed: 2000,   // 2 seconds per slide
  cssEase: "linear",     // smooth scroll
  pauseOnHover: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: "40px" } },
    { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "20px" } },
  ],
};


  const steps = [
    { title: "Register", desc: "Create your student account quickly." },
    { title: "Upload", desc: "Attach files and submit assignments." },
    { title: "Feedback", desc: "Get comments and grade updates from instructors." },
  ];

  return (
    <>
      <Hero
        title="Welcome to Internshala Portal"
        subtitle="Your one-stop solution for assignments, courses, and collaboration."
        ctaText="Get Started"
        secondaryCta="Learn More"
        onCtaClick={() => navigate("/register")}
        onSecondaryCta={() =>
          document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
        }
        heroBg="/assets/hero-bg.png"
      />

      {/* Auto Carousel */}
      <section className="section" id="features" style={{ background: "#f5f9ff", padding: "60px 20px" }}>
        <div className="container">
          <h2 className={styles.heading}>Featured Features</h2>
          <Slider {...settings} className={styles.carousel}>
            {featureCards.map((card, i) => (
              <div key={i} className={styles.cardWrapper}>
                <Card {...card} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ padding: "60px 20px", background: "#ffffff" }}>
        <div className="container">
          <h2 className={styles.heading}>How It Works</h2>
          <div className={styles.steps}>
            {steps.map((step, i) => (
              <div key={i} className={styles.step}>
                <h4>{i + 1}. {step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
