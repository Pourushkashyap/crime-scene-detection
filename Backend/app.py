# from flask import Flask, request, jsonify, send_file
# from ultralytics import YOLO
# import os
# import cv2
# from datetime import datetime

# app = Flask(__name__)

# # Load model once when API starts
# model = YOLO("runs/detect/train4/weights/best.pt")

# UPLOAD_FOLDER = "uploads"
# RESULT_FOLDER = "results"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# os.makedirs(RESULT_FOLDER, exist_ok=True)

# @app.route('/detect', methods=['POST'])
# def detect():
#     if 'image' not in request.files:
#         return jsonify({"error": "No image file in request"}), 400

#     image = request.files['image']
#     timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
#     input_path = os.path.join(UPLOAD_FOLDER, f"input_{timestamp}.jpg")
#     output_path = os.path.join(RESULT_FOLDER, f"output_{timestamp}.jpg")
    
#     image.save(input_path)

#     # Run detection
#     results = model(input_path)
#     results[0].save(filename=output_path)

#     return send_file(output_path, mimetype='image/jpeg')

# if __name__ == '__main__':
#     app.run(debug=True)



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from ultralytics import YOLO
# import cv2
# import numpy as np
# import base64

# app = Flask(__name__)
# CORS(app)

# # Load your trained YOLO model
# model = YOLO("runs/detect/train4/weights/best.pt")
# print("✅ Model Loaded:", model.names)

# @app.route("/detect", methods=["POST"])
# def analyze():
#     if "file" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["file"]
#     img_bytes = file.read()
#     np_img = np.frombuffer(img_bytes, np.uint8)
#     img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

#     results = model(img)[0]
#     names = model.names
#     detections = []

#     CONFIDENCE_THRESHOLD = 0.5
#     for box in results.boxes:
#         conf = float(box.conf[0])
#         if conf < CONFIDENCE_THRESHOLD:
#             continue

#         cls = int(box.cls[0])
#         label = names[cls]
#         x1, y1, x2, y2 = map(int, box.xyxy[0])

#         # Draw box and label on image
#         cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
#         cv2.putText(img, f"{label} {int(conf*100)}%", (x1, y1 - 10),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

#         detections.append({
#             "type": label,
#             "confidence": conf,
#             "location": {
#                 "x": x1,
#                 "y": y1,
#                 "width": x2 - x1,
#                 "height": y2 - y1
#             }
#         })

#     # Encode image to base64
#     _, buffer = cv2.imencode('.jpg', img)
#     img_base64 = base64.b64encode(buffer).decode('utf-8')

#     return jsonify({
#         "image": img_base64,
#         "detections": detections,
#         "detectionCount": len(detections),
#         "confidence": sum(d["confidence"] for d in detections) / len(detections) if detections else 0,
#         "processingTime": "120ms"
#     })

# # ✅ Corrected startup trigger
# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from ultralytics import YOLO
import cv2
import numpy as np
import base64
import os
import time

# Initialize Flask app
app = Flask(__name__, static_folder='dist', static_url_path='')
CORS(app)

# Load YOLO model once when app starts
model = YOLO("runs/detect/train4/weights/best.pt")
print("✅ Model Loaded:", model.names)

# ---------------------- API ROUTE ---------------------- #
@app.route("/detect", methods=["POST"])
def analyze():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    img_bytes = file.read()
    np_img = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    results = model(img)[0]
    names = model.names
    detections = []

    CONFIDENCE_THRESHOLD = 0.5
    for box in results.boxes:
        conf = float(box.conf[0])
        if conf < CONFIDENCE_THRESHOLD:
            continue

        cls = int(box.cls[0])
        label = names[cls]
        x1, y1, x2, y2 = map(int, box.xyxy[0])

        # Draw box and label on image
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(img, f"{label} {int(conf*100)}%", (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

        detections.append({
            "type": label,
            "confidence": round(conf, 2),
            "location": {
                "x": x1,
                "y": y1,
                "width": x2 - x1,
                "height": y2 - y1
            }
        })

    # Encode annotated image to base64
    _, buffer = cv2.imencode('.jpg', img)
    img_base64 = base64.b64encode(buffer).decode('utf-8')

    return jsonify({
        "image": img_base64,
        "detections": detections,
        "detectionCount": len(detections),
        "confidence": round(sum(d["confidence"] for d in detections) / len(detections), 2) if detections else 0,
        "processingTime": "120ms"
    })

# ---------------------- FRONTEND ROUTE ---------------------- #
@app.route('/')
@app.route('/<path:path>')
def serve_react(path=""):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# ---------------------- RUN APP ---------------------- #
if __name__ == "__main__":
    app.run(debug=True)


# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# from ultralytics import YOLO
# import cv2
# import numpy as np
# import base64
# import os
# import time

# # ✅ Initialize Flask app
# app = Flask(__name__, static_folder='dist', static_url_path='')
# CORS(app)

# # ✅ Load YOLO model (same folder: yolov8n.pt)
# model = YOLO("yolov8n.pt")
# print("✅ Model Loaded:", model.names)

# # ---------------------- API ROUTE ---------------------- #
# @app.route("/detect", methods=["POST"])
# def analyze():
#     if "file" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["file"]
#     img_bytes = file.read()
#     np_img = np.frombuffer(img_bytes, np.uint8)
#     img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

#     # 🔍 Run model on image
#     results = model(img)[0]
#     names = model.names
#     detections = []

#     CONFIDENCE_THRESHOLD = 0.5
#     for box in results.boxes:
#         conf = float(box.conf[0])
#         if conf < CONFIDENCE_THRESHOLD:
#             continue

#         cls = int(box.cls[0])
#         label = names[cls]
#         x1, y1, x2, y2 = map(int, box.xyxy[0])

#         # 🟩 Draw box and label on image
#         cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
#         cv2.putText(img, f"{label} {int(conf*100)}%", (x1, y1 - 10),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

#         detections.append({
#             "type": label,
#             "confidence": round(conf, 2),
#             "location": {
#                 "x": x1,
#                 "y": y1,
#                 "width": x2 - x1,
#                 "height": y2 - y1
#             }
#         })

#     # 🔁 Encode image to base64 for frontend preview
#     _, buffer = cv2.imencode('.jpg', img)
#     img_base64 = base64.b64encode(buffer).decode('utf-8')

#     return jsonify({
#         "image": img_base64,
#         "detections": detections,
#         "detectionCount": len(detections),
#         "confidence": round(sum(d["confidence"] for d in detections) / len(detections), 2) if detections else 0,
#         "processingTime": "120ms"
#     })

# # ---------------------- FRONTEND ROUTE ---------------------- #
# @app.route('/')
# @app.route('/<path:path>')
# def serve_react(path=""):
#     if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
#         return send_from_directory(app.static_folder, path)
#     else:
#         return send_from_directory(app.static_folder, 'index.html')

# # ---------------------- RUN APP ---------------------- #
# if __name__ == "__main__":
#     app.run(debug=True)
