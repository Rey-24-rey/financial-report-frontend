from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pandas as pd
import pdfplumber
import pytesseract
from docx import Document
from PIL import Image

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # This will allow all origins; for production, specify the frontend URL

# Create an uploads folder to save files
UPLOAD_FOLDER = 'uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed file extensions for uploading
ALLOWED_EXTENSIONS = {'xlsx', 'xls', 'docx', 'pdf', 'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)

        # Debugging: Check file details after saving
        print(f"File uploaded: {file.filename}, Size: {os.path.getsize(filename)} bytes")

        # Process the file based on its extension
        file_extension = filename.rsplit('.', 1)[1].lower()
        print(f"Processing file of type: {file_extension}")

        if file_extension in ['xlsx', 'xls']:
            return process_excel(filename)
        elif file_extension == 'docx':
            return process_word(filename)
        elif file_extension == 'pdf':
            return process_pdf(filename)
        elif file_extension in ['jpg', 'jpeg', 'png']:
            return process_image(filename)

    return jsonify({"error": "Invalid file format"}), 400


@app.route('/get-data', methods=['GET'])
def get_data():
    # Example: Return static or stored financial data
    return jsonify({
        "productSales": {
            "headers": ["Product", "Total Sales"],
            "rows": [["Item A", 220], ["Item B", 330], ["Item C", 200]],
            "summary": "The sales data shows the following top-selling products."
        },
        "profitLoss": {
            "headers": ["Metric", "Value"],
            "message": "The current profit indicates that the business is on the right track.",
            "rows": [["Average Profit", "$150.00"]],
            "summary": "The company has made a profit of $150.00 based on the current data."
        },
        "trendData": {
            "headers": ["Date", "Sales"],
            "rows": [["2025-01-01", 100], ["2025-01-02", 150], ["2025-01-03", 200]],
            "summary": "The sales trend over the last few days shows positive growth.",
            "trend": "Overall, there is a positive growth trend."
        }
    })

def process_excel(filename):
    df = pd.read_excel(filename)
    analysis_data = {}

    # Product Sales Table
    if 'products' in df.columns and 'sales' in df.columns:
        product_sales = df.groupby('products')['sales'].sum().reset_index()
        analysis_data['productSales'] = {
            "headers": ["Product", "Total Sales"],
            "rows": product_sales.values.tolist(),
            "summary": "The sales data shows the following top-selling products."
        }

    # Sales Trend Table
    if 'sales' in df.columns and 'date' in df.columns:
        sales_trend = df[['date', 'sales']].dropna()
        analysis_data['trendData'] = {
            "headers": ["Date", "Sales"],
            "rows": sales_trend.values.tolist(),
            "summary": "The sales trend over the last few days shows positive growth.",
            "trend": "Overall, there is a positive growth trend."
        }

    # Profit/Loss Table (Structured as Table Instead of Text)
    if 'sales' in df.columns:
        mean_sales = df['sales'].mean()
        analysis_data['profitLoss'] = {
            "headers": ["Metric", "Value"],
            "rows": [["Average Profit", f"${mean_sales:.2f}"]],
            "summary": f"The company has made a profit of ${mean_sales:.2f} based on the current data.",
            "message": "The current profit indicates that the business is on the right track."
        }

    return jsonify(analysis_data)



def process_word(filename):
    doc = Document(filename)
    text = "\n".join([para.text for para in doc.paragraphs])
    print("Word File Processed:\n", text)  # Print full text content
    return jsonify({"data": text})

def process_pdf(filename):
    with pdfplumber.open(filename) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
    print("PDF File Processed:\n", text)  # Print full extracted text
    return jsonify({"data": text})

def process_image(filename):
    image = Image.open(filename)
    text = pytesseract.image_to_string(image)
    print("Image File Processed:\n", text)  # Print full OCR text
    return jsonify({"data": text})

if __name__ == '__main__':
    app.run(debug=True)



