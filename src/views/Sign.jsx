import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function Sign() {
  const [imageURL, setImageURL] = useState(null);
  const sigCanvas = useRef();
  const create = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(URL);
  };
  const download = () => {
    const dlink = document.createElement("a");
    dlink.setAttribute("href", imageURL);
    dlink.setAttribute("download", "signature.jpg");
    dlink.click();
  };

  return (
    <div>
      {imageURL && (
        <>
          <img src={imageURL} alt="signature" className="signature" />
        </>
      )}
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ className: "sigCanvas" }}
      />
      <button onClick={create}>Create</button>
      <button onClick={download}>Download</button>
    </div>
  );
}
