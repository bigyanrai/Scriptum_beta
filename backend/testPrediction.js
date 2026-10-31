import predictSentiment from "./utils/predictSentiment.js";

const run = async () => {
  try {
    console.log("Sending to Python...");

    const result = await predictSentiment("This React tutorial is amazing");

    console.log("Prediction:", result);
  } catch (err) {
    console.error("Error:", err);
  }
};

run();
