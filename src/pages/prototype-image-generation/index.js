// import { useRef, useState } from "react";
// import style from "./index.module.scss";
// import { IoIosCloseCircle } from "react-icons/io";
// import Image from "next/image";
// import logo from "../../../public/logo.svg";
// import axios from "axios";
// import { MdClear } from "react-icons/md";

// const PrototypeImageGeneration = () => {
//   const fileInputRef = useRef(null);
//   const [imageName, setImageName] = useState("");
//   const [imagePrompt, setImagePrompt] = useState("");
//   const [error, setError] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [generating, setGenerating] = useState(false);
//   const [data, setData] = useState([]);
//   const [errorMsg, setErroMsg] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleClick = () => {
//     fileInputRef.current.click(); // trigger hidden input
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImageName(file?.name || "");
//     setSelectedFile(file || null);

//     if (fileInputRef.current) {
//       fileInputRef.current.value = null;
//     }
//   };

//   const handlePromptChange = (e) => {
//     let value = e.target.value;

//     // Prevent leading spaces
//     if (!value.trimStart()) {
//       setImagePrompt("");
//       setError("Description cannot be empty or just spaces.");
//       return;
//     }

//     // Truncate if > 500
//     if (value.length > 500) {
//       value = value.slice(0, 500);
//     }

//     setImagePrompt(value);

//     // Validation
//     if (value.trim().length < 3) {
//       setError("Description must be at least 3 characters long.");
//     } else {
//       setError("");
//     }
//   };

//   const handleGenerate = async () => {
//     setGenerating(true);

//     if (imagePrompt.length < 3) {
//       setError("Description must be at least 3 characters long.");
//       setGenerating(false);
//       return;
//     }
//     if (imagePrompt.length > 500) {
//       setError("Description cannot exceed 500 characters.");
//       setGenerating(false);
//       return;
//     }

//     setError("");
//     console.log("Generating image with prompt:", imagePrompt);

//     try {
//       const formData = new FormData();
//       if (selectedFile) {
//         formData.append("image", selectedFile); // file
//       }
//       formData.append("description", imagePrompt.trim()); // text

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_MEMBERSHIP_API_URL}/prototype/leadImageGeneration`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Response:", res.data);
//       setData(res?.data);

//       // ✅ Reset fields after success
//     } catch (error) {
//       console.error("API error:", error);
//       setErroMsg(true);
//       setMessage(error?.response?.data?.message);
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const handleReset = () => {
//     setImagePrompt("");
//     setImageName("");
//     setSelectedFile(null);
//     setData([]);
//     setErroMsg(false);
//   };

//   const handleDownload = () => {
//     const imgUrl = data?.result?.[0]?.generatedImage;
//     if (!imgUrl) return;

//     const proxyUrl = `/api/download-image?url=${encodeURIComponent(imgUrl)}`;

//     const link = document.createElement("a");
//     link.href = proxyUrl;
//     link.download = "generated-image.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <>
//       <div className={style.header_div}>
//         <Image src={logo} alt="" style={{ cursor: "pointer" }} />
//       </div>
//       <div className={style.main_container}>
//         <div className={style.content_div}>
//           <h5 className={style.top_heading}>AI Image Generation</h5>

//           {/* DIV FOR UPLOADING THE IMAGE */}
//           <div className={style.image_div}>
//             <div className={style.image_text}>
//               <div className={style.img_type}>
//                 {imageName ? "Selected Image" : "Upload Image"}
//               </div>
//               {generating
//                 ? ""
//                 : imageName && (
//                     <IoIosCloseCircle
//                       size={26}
//                       color="#e72d38"
//                       style={{ cursor: "pointer" }}
//                       onClick={() => setImageName("")}
//                     />
//                   )}
//             </div>
//             <div
//               className={
//                 imageName || generating
//                   ? style.inner_div_img_selected
//                   : style.inner_div_img
//               }
//               onClick={generating ? null : imageName ? null : handleClick}
//             >
//               <div className={style.file_name}>
//                 {imageName ? imageName : "Click to select an image"}
//               </div>
//             </div>
//             <input
//               type="file"
//               ref={fileInputRef}
//               accept=".jpg,.jpeg"
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//             />
//           </div>

//           {/* DIV FOR ADDING THE PROMPT */}
//           <div className={style.text_div}>
//             <div className={style.image_text}>
//               <div className={style.img_type}>
//                 Image Generation Prompt{" "}
//                 <span className={style.important}>*</span>
//               </div>
//             </div>
//             <textarea
//               className={style.image_gen_input}
//               rows={4}
//               autoCorrect="off"
//               spellCheck={false}
//               autoCapitalize="none"
//               placeholder="Enter the description to transform this image"
//               value={imagePrompt}
//               onChange={handlePromptChange}
//               maxLength={500}
//               disabled={generating}
//             />
//             <div className={style.validation}>
//               <div>Minimum: 3 Characters</div>
//               <div>{imagePrompt.length} / 500</div>
//             </div>
//           </div>

//           {/* BUTTON TO GENERATE IMAGE */}
//           <div className={style.button_div}>
//             <div
//               className={`${
//                 error || imagePrompt.length < 3 || generating
//                   ? style.disabled_btn
//                   : style.generate_btn
//               }`}
//               onClick={
//                 error || imagePrompt.length < 3 || generating
//                   ? null
//                   : handleGenerate
//               }
//             >
//               {generating ? "Generating Image..." : "Generate Image"}
//             </div>
//           </div>

//           {/* DIV FOR GENERATED IMAGE */}
//           <div className={style.preview_div}>
//             <div className={style.preview_image_text}>
//               <div className={style.img_type}>
//                 {generating ? "Generating" : "Generated"} Image Preview
//               </div>
//               {(data?.length !== 0 || errorMsg) && (
//                 <div className={style.clear_btn} onClick={handleReset}>
//                   Clear <MdClear size={14} />
//                 </div>
//               )}
//             </div>

//             <div className="image-preview">
//               {generating ? (
//                 // loader wala part jo aap already use kar rahe ho
//                 <div className={style.loader_div}>
//                   <div className={style.loader}></div>
//                   <p className={style.generating_msg}>Generating Image...</p>
//                 </div>
//               ) : data?.result ? (
//                 <>
//                   <img
//                     src={data?.result?.[0]?.generatedImage}
//                     alt="Generated"
//                     style={{ width: "100%", padding: "10px 0" }}
//                   />
//                   <div className={style.button_main}>
//                     <button
//                       onClick={() =>
//                         window.open(data?.result?.[0]?.generatedImage, "_blank")
//                       }
//                       className={style.view_btn} // add a style for this
//                     >
//                       View
//                     </button>

//                     <button
//                       onClick={handleDownload}
//                       className={style.download_btn}
//                     >
//                       Download
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 // jab abhi tak image generate hi nahi hui
//                 <p className={style.no_img_yet}>
//                   {errorMsg ? message : "No Image Generated Yet"}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PrototypeImageGeneration;

import { useRef, useState } from "react";
import style from "./index.module.scss";
import { IoIosCloseCircle } from "react-icons/io";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import axios from "axios";
import { MdClear } from "react-icons/md";

const PrototypeImageGeneration = () => {
  const fileInputRef = useRef(null);
  const [imageName, setImageName] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [data, setData] = useState([]);
  const [errorMsg, setErroMsg] = useState(false);
  const [message, setMessage] = useState("");

  console.log('fixed again...')
  // ✅ New state for dropdown
  const [adType, setAdType] = useState("Product Ad");

  const handleClick = () => {
    fileInputRef.current.click(); // trigger hidden input
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageName(file?.name || "");
    setSelectedFile(file || null);

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handlePromptChange = (e) => {
    let value = e.target.value;

    // Prevent leading spaces
    if (!value.trimStart()) {
      setImagePrompt("");
      setError("Description cannot be empty or just spaces.");
      return;
    }

    // Truncate if > 500
    if (value.length > 500) {
      value = value.slice(0, 500);
    }

    setImagePrompt(value);

    // Validation
    if (value.trim().length < 3) {
      setError("Description must be at least 3 characters long.");
    } else {
      setError("");
    }
  };

  const handleGenerate = async () => {
    setImageName('')
    setGenerating(true);

    if (imagePrompt.length < 3) {
      setError("Description must be at least 3 characters long.");
      setGenerating(false);
      return;
    }
    if (imagePrompt.length > 500) {
      setError("Description cannot exceed 500 characters.");
      setGenerating(false);
      return;
    }

    setError("");
    console.log("Generating image with prompt:", imagePrompt);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("image", selectedFile); // file
      }
      formData.append("description", imagePrompt.trim()); // text

      // ✅ Append dropdown value
      formData.append("suitableFor", adType);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_MEMBERSHIP_API_URL}/prototype/leadImageGeneration`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", res.data);
      setData(res?.data);

      // ✅ Reset fields after success (if needed)
    } catch (error) {
      console.error("API error:", error);
      setErroMsg(true);
      setMessage(error?.response?.data?.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleReset = () => {
    setImagePrompt("");
    setImageName("");
    setSelectedFile(null);
    setData([]);
    setErroMsg(false);
    setAdType("Product Ad"); // ✅ Reset dropdown to default
  };

  const handleDownload = () => {
    const imgUrl = data?.result?.[0]?.generatedImage;
    if (!imgUrl) return;

    const proxyUrl = `/api/download-image?url=${encodeURIComponent(imgUrl)}`;

    const link = document.createElement("a");
    link.href = proxyUrl;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className={style.header_div}>
        <Image src={logo} alt="" style={{ cursor: "pointer" }} />
      </div>
      <div className={style.main_container}>
        <div className={style.content_div}>
          <h5 className={style.top_heading}>AI Image Generation</h5>

          {/* DIV FOR UPLOADING THE IMAGE */}
          <div className={style.image_div}>
            <div className={style.image_text}>
              <div className={style.img_type}>
                {imageName ? "Selected Image" : "Upload Image"}
              </div>
              {generating
                ? ""
                : imageName && (
                    <IoIosCloseCircle
                      size={26}
                      color="#e72d38"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setImageName("");
                        setSelectedFile(null);
                      }}
                    />
                  )}
            </div>
            <div
              className={
                imageName || generating
                  ? style.inner_div_img_selected
                  : style.inner_div_img
              }
              onClick={generating ? null : imageName ? null : handleClick}
            >
              <div className={style.file_name}>
                {imageName ? imageName : "Click to select an image"}
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".jpg,.jpeg"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          {/* ✅ Dropdown for Ad Type */}
          <div className={style.text_div}>
            <div className={style.image_text}>
              <div className={style.img_type}>Select Model Type</div>
            </div>
            <select
              className={style.image_gen_input}
              value={adType}
              onChange={(e) => setAdType(e.target.value)}
              disabled={generating}
            >
              <option value="Product Ad">Product Ad</option>
              <option value="Brand Campaign">Brand Campaign</option>
              <option value="Catalog">Catalog</option>
              <option value="Lifestyle Post">Lifestyle Post</option>
            </select>
          </div>

          {/* DIV FOR ADDING THE PROMPT */}
          <div className={style.text_div}>
            <div className={style.image_text}>
              <div className={style.img_type}>
                Image Generation Prompt{" "}
                <span className={style.important}>*</span>
              </div>
            </div>
            <textarea
              className={style.image_gen_input}
              rows={4}
              autoCorrect="off"
              spellCheck={false}
              autoCapitalize="none"
              placeholder="Enter the description to transform this image"
              value={imagePrompt}
              onChange={handlePromptChange}
              maxLength={500}
              disabled={generating}
            />
            <div className={style.validation}>
              <div>Minimum: 3 Characters</div>
              <div>{imagePrompt.length} / 500</div>
            </div>
          </div>

          {/* BUTTON TO GENERATE IMAGE */}
          <div className={style.button_div}>
            <div
              className={`${
                error || imagePrompt.length < 3 || generating
                  ? style.disabled_btn
                  : style.generate_btn
              }`}
              onClick={
                error || imagePrompt.length < 3 || generating
                  ? null
                  : handleGenerate
              }
            >
              {generating ? "Generating Image..." : "Generate Image"}
            </div>
          </div>

          {/* DIV FOR GENERATED IMAGE */}
          <div className={style.preview_div}>
            <div className={style.preview_image_text}>
              <div className={style.img_type}>
                {generating ? "Generating" : "Generated"} Image Preview
              </div>
              {(data?.length !== 0 || errorMsg) && (
                <div className={style.clear_btn} onClick={handleReset}>
                  Clear <MdClear size={14} />
                </div>
              )}
            </div>

            <div className="image-preview">
              {generating ? (
                <div className={style.loader_div}>
                  <div className={style.loader}></div>
                  <p className={style.generating_msg}>Generating Image...</p>
                </div>
              ) : data?.result ? (
                <>
                  <img
                    src={data?.result?.[0]?.generatedImage}
                    alt="Generated"
                    style={{ width: "100%", padding: "10px 0" }}
                  />
                  <div className={style.button_main}>
                    <button
                      onClick={() =>
                        window.open(data?.result?.[0]?.generatedImage, "_blank")
                      }
                      className={style.view_btn}
                    >
                      View
                    </button>

                    <button
                      onClick={handleDownload}
                      className={style.download_btn}
                    >
                      Download
                    </button>
                  </div>
                </>
              ) : (
                <p className={style.no_img_yet}>
                  {errorMsg ? message : "No Image Generated Yet"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrototypeImageGeneration;
