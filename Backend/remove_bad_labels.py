import os

# Path to labels
folders = [
    'dataset/train/labels',
    'dataset/valid/labels',
    'dataset/test/labels'  # Only if you have test data
]

MAX_CLASS = 2  # Because we have 0, 1, 2 → total 3 classes

for folder in folders:
    if not os.path.exists(folder):
        continue

    for filename in os.listdir(folder):
        if filename.endswith(".txt"):
            file_path = os.path.join(folder, filename)
            with open(file_path, "r") as f:
                lines = f.readlines()

            valid = True
            for line in lines:
                class_id = int(line.split()[0])
                if class_id > MAX_CLASS:
                    print(f"❌ Removing {file_path} → Invalid class ID: {class_id}")
                    valid = False
                    break

            if not valid:
                os.remove(file_path)
