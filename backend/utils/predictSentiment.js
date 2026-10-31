// import { spawn } from "child_process";
// import path from "path";

// const predictSentiment = (text) => {
//   return new Promise((resolve, reject) => {
//     const scriptPath = path.resolve("ml/predict.py");
//     const pythonPath = path.resolve("ml/venv/Scripts/python.exe");

//     const python = spawn(pythonPath, [scriptPath, text]);

//     let result = "";
//     let error = "";

//     python.stdout.on("data", (data) => {
//       result += data.toString();
//     });

//     python.stderr.on("data", (data) => {
//       error += data.toString();
//     });

//     python.on("close", (code) => {
//       if (code !== 0) {
//         return reject(error);
//       }

//       resolve(result.trim());
//     });
//   });
// };

// export default predictSentiment;

const predictSentiment = async (text) => {
  const response = await fetch(`${process.env.SENTIMENT_API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(`Sentiment API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  return data.sentiment;
};

export default predictSentiment;
