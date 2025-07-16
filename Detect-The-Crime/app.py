from ultralytics import YOLO
import cv2

# Load your trained model
model = YOLO("runs/detect/train4/weights/best.pt")

# Load your test image
image_path = "images.jpg"  # Make sure the image exists here
results = model(image_path)

# Show the result with bounding boxes
results[0].show()
