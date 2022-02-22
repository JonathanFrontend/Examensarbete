import React, { useState } from 'react';

const ImgComp = ({ imgSrc, alt }) => {
    const [bigger, setBigger] = useState(false);
    return <img
        src={imgSrc}
        alt={alt}
        className={bigger ? "img-big" : "img-small"}
        onClick={() => setBigger(!bigger)} />
}

export default ImgComp;