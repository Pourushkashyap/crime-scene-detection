import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Upload as UploadIcon,
  FileImage,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Camera,
  Scan,
} from "lucide-react";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [detectionResults, setDetectionResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
      setAnalysisComplete(false);
      setDetectionResults(null);
      toast({
        title: "Image loaded",
        description: "Ready for analysis",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image",
        variant: "destructive",
      });
    }
  };

  const simulateAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch("http://localhost:5000/detect", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      setImagePreview(`data:image/jpeg;base64,${data.image}`); // ✅ CORRECTED HERE
      setDetectionResults(data);
      setAnalysisComplete(true);

      toast({
        title: "Analysis complete",
        description: `Found ${data.detectionCount} items`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not analyze the image",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Evidence Analysis
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload crime scene images for AI-powered detection of blood traces, weapons, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-gradient-card p-8 rounded-xl shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Camera className="h-6 w-6 mr-2 text-primary" />
              Upload Image
            </h2>

            {!imagePreview ? (
              <div
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileImage className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">
                  Drop your image here or click to browse
                </p>
                <p className="text-muted-foreground mb-4">
                  Supports JPG, PNG, WEBP up to 10MB
                </p>
                <Button variant="outline">
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Select File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img src={imagePreview} alt="Crime scene preview" className="w-full h-64 object-cover" />
                  {analysisComplete &&
                    detectionResults &&
                    detectionResults.detections.map((d: any, i: number) => (
                      <div
                        key={i}
                        className="absolute border-2 border-danger bg-danger/20"
                        style={{
                          left: d.location.x,
                          top: d.location.y,
                          width: d.location.width,
                          height: d.location.height,
                        }}
                      >
                        <div className="bg-danger text-xs text-white px-2 py-1 rounded-br">
                          {d.type} ({(d.confidence * 100).toFixed(0)}%)
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex gap-3">
                  <Button onClick={simulateAnalysis} disabled={isAnalyzing} className="flex-1">
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Scan className="h-4 w-4 mr-2" />
                        Start Analysis
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview("");
                      setAnalysisComplete(false);
                      setDetectionResults(null);
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Results Section */}
          <div className="bg-gradient-card p-8 rounded-xl shadow-card">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-warning" />
              Detection Results
            </h2>

            {!selectedImage && (
              <div className="text-center py-12">
                <Scan className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Upload an image to see results</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-12">
                <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
                <p className="font-medium text-foreground">Analyzing image...</p>
              </div>
            )}

            {analysisComplete && detectionResults && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-success mr-2" />
                    <span className="font-medium text-foreground">Analysis Complete</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{detectionResults.processingTime}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/10 p-4 rounded-lg">
                    <div className="text-2xl font-bold">{detectionResults.detectionCount}</div>
                    <div className="text-sm text-muted-foreground">Items Detected</div>
                  </div>
                  <div className="bg-muted/10 p-4 rounded-lg">
                    <div className="text-2xl font-bold">{(detectionResults.confidence * 100).toFixed(0)}%</div>
                    <div className="text-sm text-muted-foreground">Avg Confidence</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Detected Evidence:</h3>
                  {detectionResults.detections.map((d: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                      <span className="font-medium text-foreground">{d.type}</span>
                      <span className="text-sm text-muted-foreground">
                        {(d.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;





// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Upload as UploadIcon,
//   FileImage,
//   Loader2,
//   AlertTriangle,
//   CheckCircle,
//   Camera,
//   Scan,
// } from "lucide-react";

// const Upload = () => {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string>("");
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisComplete, setAnalysisComplete] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { toast } = useToast();

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.startsWith("image/")) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//       setAnalysisComplete(false);
//       toast({
//         title: "Image loaded successfully",
//         description: "Ready for analysis",
//       });
//     } else {
//       toast({
//         title: "Invalid file type",
//         description: "Please select a valid image",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     if (file && file.type.startsWith("image/")) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//       setAnalysisComplete(false);
//     }
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//   };

//   const handleSubmitToBackend = async () => {
//     if (!selectedImage) return;

//     setIsAnalyzing(true);

//     const formData = new FormData();
//     formData.append("image", selectedImage);

//     try {
//       const response = await fetch("http://localhost:5000/detect", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Detection failed");
//       }

//       const blob = await response.blob();
//       const resultImageURL = URL.createObjectURL(blob);
//       setImagePreview(resultImageURL);
//       setAnalysisComplete(true);

//       toast({
//         title: "Analysis complete",
//         description: "Image processed and evidence detected.",
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       toast({
//         title: "Error",
//         description: "Something went wrong during detection.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-dark py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
//             Evidence Analysis
//           </h1>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Upload crime scene images for AI-powered detection of blood traces, weapons,
//             and other critical evidence.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Upload Section */}
//           <div className="bg-gradient-card p-8 rounded-xl shadow-card">
//             <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
//               <Camera className="h-6 w-6 mr-2 text-primary" />
//               Upload Image
//             </h2>

//             {!imagePreview ? (
//               <div
//                 className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
//                 onDrop={handleDrop}
//                 onDragOver={handleDragOver}
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <FileImage className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//                 <p className="text-lg font-medium text-foreground mb-2">
//                   Drop your image here or click to browse
//                 </p>
//                 <p className="text-muted-foreground mb-4">
//                   Supports JPG, PNG, WEBP up to 10MB
//                 </p>
//                 <Button variant="outline">
//                   <UploadIcon className="h-4 w-4 mr-2" />
//                   Select File
//                 </Button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <div className="relative rounded-lg overflow-hidden shadow-lg">
//                   <img
//                     src={imagePreview}
//                     alt="Crime scene preview"
//                     className="w-full h-64 object-cover"
//                   />
//                 </div>

//                 <div className="flex gap-3">
//                   <Button
//                     variant="default"
//                     onClick={handleSubmitToBackend}
//                     disabled={isAnalyzing}
//                     className="flex-1"
//                   >
//                     {isAnalyzing ? (
//                       <>
//                         <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                         Analyzing...
//                       </>
//                     ) : (
//                       <>
//                         <Scan className="h-4 w-4 mr-2" />
//                         Start Analysis
//                       </>
//                     )}
//                   </Button>
//                   <Button
//                     variant="outline"
//                     onClick={() => {
//                       setSelectedImage(null);
//                       setImagePreview("");
//                       setAnalysisComplete(false);
//                     }}
//                   >
//                     Clear
//                   </Button>
//                 </div>
//               </div>
//             )}

//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleFileSelect}
//               className="hidden"
//             />
//           </div>

//           {/* Results Section */}
//           <div className="bg-gradient-card p-8 rounded-xl shadow-card">
//             <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
//               <AlertTriangle className="h-6 w-6 mr-2 text-warning" />
//               Detection Results
//             </h2>

//             {!selectedImage && (
//               <div className="text-center py-12">
//                 <Scan className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//                 <p className="text-muted-foreground">
//                   Upload an image to see analysis results
//                 </p>
//               </div>
//             )}

//             {isAnalyzing && (
//               <div className="text-center py-12">
//                 <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
//                 <p className="text-foreground font-medium mb-2">Analyzing image...</p>
//                 <p className="text-muted-foreground">
//                   AI is scanning for blood traces, weapons, and evidence
//                 </p>
//               </div>
//             )}

//             {analysisComplete && (
//               <div className="space-y-6 text-center">
//                 <div className="flex items-center justify-center p-4 bg-success/10 border border-success/20 rounded-lg">
//                   <CheckCircle className="h-5 w-5 text-success mr-2" />
//                   <span className="font-medium text-foreground">Analysis Complete</span>
//                 </div>
//                 <p className="text-muted-foreground">
//                   The uploaded image has been processed. Bounding boxes indicate detected evidence.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Upload;



