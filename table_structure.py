import cv2
import numpy as np
import os
import pytesseract
import json
import easyocr

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# הגדרת נתיב התמונה ותיקיות
input_image_path = "test.jpeg"
output_dir = "output_cells"
output_json_path = r"C:\Users\edenb\table-ocr-backend\table_structure.json"

# יצירת תיקיית output_cells אם אינה קיימת
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# קריאת התמונה
image = cv2.imread(input_image_path)
if image is None:
    print(f"Error: File not found at {input_image_path}")
    exit()

# המרת התמונה לגווני אפור
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# סף בינארי אדפטיבי
binary = cv2.adaptiveThreshold(
    ~gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 15, -2
)

# זיהוי קווים אנכיים ואופקיים
vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 100))
horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (100, 1))
vertical_lines = cv2.morphologyEx(binary, cv2.MORPH_OPEN, vertical_kernel, iterations=2)
horizontal_lines = cv2.morphologyEx(binary, cv2.MORPH_OPEN, horizontal_kernel, iterations=2)

# עיבוי הקווים
vertical_lines = cv2.dilate(vertical_lines, vertical_kernel, iterations=1)
horizontal_lines = cv2.dilate(horizontal_lines, horizontal_kernel, iterations=1)

# איחוד קווים אנכיים ואופקיים
table_structure = cv2.add(vertical_lines, horizontal_lines)

# זיהוי קווי מתאר
contours, _ = cv2.findContours(table_structure, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

# מיון קווי המתאר לפי גודל (W*H)
sorted_contours = sorted(contours, key=lambda c: (cv2.boundingRect(c)[3] * cv2.boundingRect(c)[2]), reverse=True)

# חילוץ התאים ושמירתם
for idx, contour in enumerate(sorted_contours):
    x, y, w, h = cv2.boundingRect(contour)
    if 10 < w < image.shape[1] - 20 and 10 < h < image.shape[0] - 20:
        if w < image.shape[1] * 0.9 and h < image.shape[0] * 0.9:
            cell_image = image[y:y + h, x:x + w]
            cell_path = os.path.join(output_dir, f"cell_{y}_{x}.png")
            cv2.imwrite(cell_path, cell_image)

# קריאת התמונות מתוך תיקיית output_cells
cell_files = os.listdir(output_dir)
cells = []
for cell_file in cell_files:
    cell_path = os.path.join(output_dir, cell_file)
    cell_image = cv2.imread(cell_path)
    if cell_image is not None:
        # פענוח טקסט
        #tryyyyyyyyy
                # עיבוד מקדים לשיפור קריאות
        gray = cv2.cvtColor(cell_image, cv2.COLOR_BGR2GRAY)  # הפיכה לגווני אפור
        blur = cv2.GaussianBlur(cell_image, (5, 5), 0)  # הסרת רעשים
        _, binary = cv2.threshold(blur, 200, 255, cv2.THRESH_BINARY)
        binary = cv2.resize(binary, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

        #meee
        cv2.imwrite(cell_path, binary)

        #tryyyyyyyyyyy
        reader = easyocr.Reader(['en'])
        result = reader.readtext(binary, detail=0)
        print(result)
        
        
        #text = pytesseract.image_to_string(binary, config="--oem 3 --psm 8 tessedit_char_whitelist=0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-").strip()
        #print(f" text from cell {idx + 1}: {text}")
        cleaned_text = ''.join(c for c in result if c not in "[]")

                    # הדפסת הטקסט אחרי הניקוי
        print(f"Cleaned text from cell {idx + 1}: {cleaned_text}")
        
        # חילוץ X ו-Y מתוך שם הקובץ
        y_position = int(cell_file.split("_")[1].split(".")[0])
        x_position = int(cell_file.split("_")[2].split(".")[0])
        cells.append((x_position, y_position, cleaned_text))

# מיון לפי Y ואז X
cells.sort(key=lambda c: (c[1], c[0]))

# יצירת טבלה דו-ממדית
table = []
current_row = []
last_y = None
row_threshold = 20  # סף לזיהוי שורות חדשות

for x, y, text in cells:
    if last_y is None or abs(y - last_y) > row_threshold:
        if current_row:
            table.append(current_row)
        current_row = []
    current_row.append(text)
    last_y = y

if current_row:
    table.append(current_row)

# שמירת הטבלה בקובץ JSON
with open(output_json_path, "w") as json_file:
    json.dump(table, json_file, indent=4, ensure_ascii=False)

print(f"Saved table data to {output_json_path}")