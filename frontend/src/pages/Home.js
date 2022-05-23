import React, { useEffect } from "react";
import NavBar from "../components/Navbar/navbar";
import HomeContent from "../components/HomePage/HomeContent";
import Footer from "../components/Footer/footer";
import userAuth from "../utils/userAuth";

function Home() {
    useEffect(() => {
        if (!userAuth()) {
            navigate("/");
        }
    }, []);
    return (
        <>
            <NavBar />
            <HomeContent />
            <Footer />
        </>
    );
}

export default Home;
