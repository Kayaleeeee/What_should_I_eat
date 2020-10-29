import React, { useEffect, useState } from "react";

const PlaceInfo=()=>{


    return (
        <div>
           
             <iframe src="https://place.map.kakao.com/10185787" title="naver"></iframe>
            <style jsx>{`
                h1{
                    position: absolute;
                    top:0;
                    z-index:10000;
                }
            
            `}</style>
        </div>
    );

}

export default PlaceInfo;