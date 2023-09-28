const loadImage = async (url) => {
    const response = await fetch(url);
    const data = await response.buffer()
    const b64 = data.toString('base64');
    // let b64content = "data:" + res.headers["content-type"] + ";base64,";
    // console.log("image loaded...");
    // cb(null, body.toString("base64"));
    return b64;
}; 

export default loadImage;
