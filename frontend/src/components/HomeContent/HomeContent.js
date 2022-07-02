import React from "react";
import Heart from "../../assets/heart.svg";
import "./HomeContent.css";

const HomeContent = () => {
    return (
        <div className="d-flex container-page home-content">
            <div className="container-fluid">
                <h1 className="home-title">Hospital Universitário IFBA</h1>
                <div className="d-flex">
                    <p className="home-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies, mauris in vulputate
                        maximus, elit ipsum porttitor ipsum, ut varius tortor urna at ante. Suspendisse nibh enim,
                        vulputate id feugiat vel, accumsan vitae ante. Quisque vel tincidunt leo. Mauris rutrum sodales
                        mauris, eget hendrerit felis maximus id. In nisi tortor, iaculis ut porta sit amet, vestibulum
                        id elit. Fusce nec eros lectus. Nunc mollis leo in dolor finibus, quis condimentum est interdum.
                        Proin at nulla ex. Nulla facilisi. Nam ullamcorper lorem pretium risus malesuada, vehicula
                        viverra dui ullamcorper. Suspendisse vestibulum sagittis mauris non volutpat. Vestibulum quis
                        accumsan nulla. Cras nec metus sapien. Donec eu ante non dui egestas scelerisque et in nisi.
                        Aliquam ut malesuada orci. Pellentesque facilisis ante sit amet vulputate cursus. Etiam mattis
                        vitae felis id luctus. Mauris porttitor faucibus purus vitae commodo. In hendrerit semper nibh
                        nec dictum. Vivamus a nisl ac erat porta euismod. Nulla ut tellus id mi sagittis sollicitudin.
                        Aliquam sed sapien vitae massa finibus fringilla. Phasellus quis risus sed enim molestie
                        vehicula eu non diam. Quisque sed nisi in ligula consequat viverra eget eu velit. Pellentesque
                        ut ante arcu. Donec interdum placerat risus, ac ultrices diam pharetra ac. Proin ut mollis
                        sapien. Aenean quis ante mauris. Integer felis neque, placerat sed orci sed, iaculis aliquet
                        augue. In commodo pretium ligula eget volutpat. Sed volutpat tellus id sodales finibus.
                        Vestibulum ornare rutrum nibh a pulvinar. In sed urna porttitor, mollis orci blandit, vulputate
                        lorem. Vivamus dapibus efficitur tellus id tristique. Nullam vehicula malesuada nisi, a egestas
                        augue laoreet in. Duis varius eget erat non gravida. Cras hendrerit tincidunt lacus, et rutrum
                        lorem auctor sit amet. Nullam vel nibh at turpis efficitur porta quis non risus. Vivamus non
                        neque vel nibh luctus hendrerit. Nunc sed tincidunt ipsum. Integer risus risus, pharetra ut
                        neque eget, eleifend tincidunt ante.
                    </p>
                    <div className="heart-container">
                        <img src={Heart} className="heart-img" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeContent;
