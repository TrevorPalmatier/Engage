import React, { useEffect, useState } from "react";
import NavbarScroller from "../Components/NavbarScroller";
import "../App.scss";
import "../Styling/ViewStudies.scss";
import { useNavigate } from "react-router-dom";
import { Layout } from "../Components/Layout";

const ViewStudies = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const abortController = new AbortController();

    fetch("https://ancient-ridge-25388.herokuapp.com/studies", {
      signal: abortController.signal,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      abortController.abort(); // cancel pending fetch request on component unmount
    };
  }, [data]);

  const navigate = useNavigate(); //sets up navigation

  const goToCreateStudy = () => {
    navigate("/createstudy");
  };

  const gotToBlocks = (id) => {
    navigate(`/viewblocks/${id}`);
  };

  return (
    <Layout>
      <div className="viewHeader">
        <h1>Studies</h1>
      </div>
      <div className="submitButtons">
        <button className="buttonText" onClick={goToCreateStudy}>
          Create Study
        </button>
      </div>
      <div className="studiesGrid">
        {data.map((study) => {
          var img = new Image();
          img.src = study.imageLink;
          if (img.height > img.width) {
            return (
              <div
                className="taller"
                key={study.id}
                onClick={() => gotToBlocks(study.id)}
              >
                <img key={study.id} src={study.imageLink}></img>
                <h3>{study.title}</h3>
              </div>
            );
          } else {
            return (
              <div
                className="wider"
                key={study.id}
                onClick={() => gotToBlocks(study.id)}
              >
                <img key={study.id} src={study.imageLink}></img>
                <h3>{study.title}</h3>
              </div>
            );
          }
        })}
      </div>
    </Layout>
  );
};
export default ViewStudies;
