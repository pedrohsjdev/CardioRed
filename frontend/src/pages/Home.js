import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import HomeContent from "../components/HomeContent/HomeContent";
import Footer from "../components/Footer/footer";
import { useNavigate } from "react-router-dom";
import { userIsAuthenticated } from "../services/Login/LoginService";

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!userIsAuthenticated()) {
            navigate("/");
        }
    }, []);

    return (
        <>
            <Navbar />
            <HomeContent />
            <Footer />
        </>
    );
}

export default Home;
