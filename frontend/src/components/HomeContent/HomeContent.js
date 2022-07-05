import React from "react";
import Heart from "../../assets/heart.svg";
import "./HomeContent.css";

const HomeContent = () => {
    return (
        <div className="d-flex container-page home-content">
            <div className="container-fluid">
                <h1 className="home-title">Hospital Universitário IFBA</h1>
                <div className="d-flex">
                    <div>
                        <p className="home-description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies, mauris in vulputate
                            maximus, elit ipsum porttitor ipsum, ut varius tortor urna at ante. Suspendisse nibh enim,
                            vulputate id feugiat vel, accumsan vitae ante. Quisque vel tincidunt leo. Mauris rutrum
                            sodales mauris, eget hendrerit felis maximus id. In nisi tortor, iaculis ut porta sit amet,
                            vestibulum id elit. Fusce nec eros lectus. Nunc mollis leo in dolor finibus, quis
                            condimentum est interdum. Proin at nulla ex.
                        </p>
                        <p className="home-description">
                            <span className="">Aliquam ut malesuada orci.</span> Pellentesque facilisis ante sit amet
                            vulputate cursus. Etiam mattis vitae felis id luctus. Mauris porttitor faucibus purus vitae
                            commodo. In hendrerit semper nibh nec dictum. Vivamus a nisl ac erat porta euismod. Nulla ut
                            tellus id mi sagittis sollicitudin. Aliquam sed sapien vitae massa finibus fringilla.
                        </p>
                    </div>
                    <div className="heart-container">
                        <img src={Heart} className="heart-img" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeContent;
