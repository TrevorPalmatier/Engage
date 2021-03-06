import React, { useEffect, useState } from "react";
import "../../App.scss";
import "./FakeScreen.scss";
import {Image} from "cloudinary-react";
/**
 * this is to show a fake screen for each slide of a block
 */
const FakeScreen = ({ id }) => {
  const [slideData, setData] = useState<any>({});
  const [str1, setFirstStr] = useState("");
  const [str2, setSecStr] = useState("");
  const [option, setOption] = useState(1);

  useEffect(() => {
    fetch(`/slides/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setSlideOption(data);
      });
  }, [id, option]);

  const setSlideOption = (slide) => {
    if(slide.medias?.length === 2){
      setFirstStr(
        slide.backgroundText.slice(0, slide.backgroundText.length / 3)
      );
      setSecStr(
        slide.backgroundText.slice(
          slide.backgroundText.length / 3,
          slide.backgroundText.length - 1
        )
      );
      setOption(3);
      return;
    }else if(slide.medias?.length === 0){
      setOption(4);
      return;
    }else if(slide.medias?.length === 1 && slide.option === 3){
      setOption(1);
      setFirstStr(slide.backgroundText);
    }

    if (slide.option === 1) {
      setOption(1);
      setFirstStr(slide.backgroundText);
    } else {
      setOption(2);
      setFirstStr(
        slide.backgroundText.slice(0, slide.backgroundText.length / 3)
      );
      setSecStr(
        slide.backgroundText.slice(
          slide.backgroundText.length / 3,
          slide.backgroundText.length - 1
        )
      );
    }
    
  };

  return (
    <div className="smartphone">
      <div className="content1">
        <div className="header">
          <h2>{slideData.title}</h2>
        </div>
        {option === 4 &&
          <div>
            <p className="text">{slideData.backgroundText}</p>
          </div>
        }
        {slideData.medias?.map((media) => {
          if (media.position === 1) {
            if(option === 1){
              return (
                <div key = {media.id} className="option1">
                  {media.type === "video" && 
                    <iframe
                    src={`https://www.youtube.com/embed/${media.imageID}`}/>
                  }
                  {media.type === "image" && 
                   <Image cloudName='engageapp' publicId={media.imageID}/>
                   }
                  <p className="text">{str1}</p>
                </div>
              );
            }
            else if(option === 2){
              return (
                <div  key = {media.id}>
                  <p className="text">{str1}</p>
                  {media.type === "video" && 
                    <iframe
                    src={`https://www.youtube.com/embed/${media.imageID}`}/>
                  }
                  {media.type === "image" && 
                   <Image cloudName='engageapp' publicId={media.imageID}/>
                   }
                 
                  <p className="text">{str2}</p>
                </div>
              );
            } else if (media.position === 1 && option === 3) {
              return(
                <div key = {media.id}>
                {media.type === "video" && 
                    <iframe
                    src={`https://www.youtube.com/embed/${media.imageID}`}/>
                  }
                  {media.type === "image" && 
                   <Image cloudName='engageapp' publicId={media.imageID}/>
                   }
                  </div>
              )
            }
          }else if (media.position === 2 && option === 3) {
            return (
              <div  key = {media.id}>
                <p className="text">{str1}</p>
                {media.type === "video" && 
                    <iframe
                    src={`https://www.youtube.com/embed/${media.imageID}`}/>
                  }
                {media.type === "image" && 
                  <Image cloudName='engageapp' publicId={media.imageID}/>
                  }
                <p className="text">{str2}</p>
              </div>
            );
          }
          return(<div></div>);
        })} 
      </div>
    </div>
  );
};

export default FakeScreen;
