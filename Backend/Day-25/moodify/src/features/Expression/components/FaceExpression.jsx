import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);
  const [expression, setExpression] = useState("Starting camera...");

  let lastVideoTime = -1;

  useEffect(() => {
    init();
    return cleanup;
  }, []);

  const init = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
    );

    
    landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "CPU",
      },
      outputFaceBlendshapes: true,
      runningMode: "VIDEO",
      numFaces: 1,
    });

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;

    videoRef.current.onloadeddata = () => {
      videoRef.current.play();
      detectLoop();
    };
  };

  const detectLoop = () => {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;

    if (!video || !landmarker) return;

    if (video.currentTime !== lastVideoTime) {
      lastVideoTime = video.currentTime;

      const results = landmarker.detectForVideo(video, performance.now());

      if (results.faceBlendshapes?.length > 0) {
        const blend = results.faceBlendshapes[0].categories;

        const getScore = (name) =>
          blend.find((b) => b.categoryName === name)?.score || 0;

        const smile = getScore("mouthSmileLeft") + getScore("mouthSmileRight");

        const frown = getScore("mouthFrownLeft") + getScore("mouthFrownRight");

        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");

        let current = "😐 Neutral";

        if (smile > 0.35) current = "😊 Happy";
        else if (jawOpen > 0.25 && browUp > 0.2) current = "😲 Surprise";
        else if (frown > 0.025) current = "😢 Sad";

        setExpression(current);
      }
    }

    animationRef.current = requestAnimationFrame(detectLoop);
  };

  const cleanup = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (landmarkerRef.current) landmarkerRef.current.close();

    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{expression}</h2>
      <video
        ref={videoRef}
        style={{ width: "420px", borderRadius: "12px" }}
        playsInline
      />
    </div>
  );
}
