import { useState } from "react";
const QRcode = () => {
    const [img,setImg] = useState("");
    const[loading,setLoading] = useState(false);
    const[qrData,setQrData] = useState("");
    const[qrSize,setQRsize] = useState("150");

    async function generateButton(){
        setLoading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);  
        }
        catch(error){
            console.log("Error generating QR code",error);
        } finally{
            setLoading(false);
        }   
    }
    function downloadQR(){
        fetch(img)
         .then((response)=>response.blob())
         .then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
         }).catch((error)=>{
            console.log("Error generating QR code",error)
         })
    }
  return (
         <div className="app-container">
            <h1>QR CODE GENERATOR</h1>
            {loading && <p>Please Wait....</p>}
            {img && <img src={img} alt="" className="qr-code-image"/>}
            <div>
                <label htmlFor="dataInput" className="input-label">
                    Data for QR Code:
                </label>
                <input type="text" id="dataInput" placeholder="Enter Data for QR Code" value={qrData} onChange={(e)=>setQrData(e.target.value)}/>
                <label htmlFor="sizeInput" className="input-label">
                    Image Size (eg., 150)
                </label>
                <input type="text" id="sizeInput" placeholder="Enter Image Size" value={qrSize} onChange={(e)=>setQRsize(e.target.value)} />
                <button className="generate-button" onClick={generateButton} disabled={loading}>Generate QR Code</button>
                <button className="download-button" onClick={downloadQR}>Download QR Code</button>
            </div>
            <p className="footer">Designed By Vaishnavi</p>
        </div> 
  )
}

export default QRcode