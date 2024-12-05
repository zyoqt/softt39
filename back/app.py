from flask import Flask, request, jsonify
import cv2
import numpy as np
import joblib
from skimage.feature import hog
from scipy.signal import hilbert

app = Flask(__name__)

# Load the trained model
model_path = 'C:/Users/Marl Anjelo C. Potal/Desktop/t39/back/model/random_forest_flawed_model.joblib'
model = joblib.load(model_path)

def preprocess_frame(image):
    # Decode the image from base64
    nparr = np.frombuffer(image, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Convert to grayscale and resize
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    resized_frame = cv2.resize(gray_frame, (128, 128))

    # Extract HOG features
    try:
        hog_features, _ = hog(
            resized_frame,
            pixels_per_cell=(16, 16),
            cells_per_block=(2, 2),
            visualize=True
        )
    except ValueError:
        return None

    # Apply Local Mean Decomposition (LMD)
    signal = np.mean(resized_frame, axis=0)
    analytic_signal = hilbert(signal)
    amplitude_envelope = np.abs(analytic_signal)

    # Combine features and ensure consistent length
    combined_features = np.concatenate([hog_features, amplitude_envelope])
    fixed_length = 500
    if combined_features.shape[0] < fixed_length:
        combined_features = np.pad(combined_features, (0, fixed_length - combined_features.shape[0]), 'constant')
    elif combined_features.shape[0] > fixed_length:
        combined_features = combined_features[:fixed_length]

    return combined_features

@app.route('/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image_file = request.files['image'].read()
    features = preprocess_frame(image_file)
    if features is None:
        return jsonify({"error": "Error in feature extraction"}), 500

    prediction = model.predict([features])[0]
    label = "Flawed" if prediction == 1 else "Not Flawed"
    return jsonify({"label": label})

if __name__ == '__main__':
    app.run(debug=True)
