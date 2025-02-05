from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow frontend access

# Create an uploads folder to save files
UPLOAD_FOLDER = 'uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed file extensions
ALLOWED_EXTENSIONS = {'xlsx', 'xls'}

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
        return process_excel(filename)

    return jsonify({"error": "Invalid file format"}), 400

@app.route('/get-data', methods=['GET'])
def get_data():
    return jsonify({"message": "Upload a file to get analysis."})

def process_excel(filename):
    df = pd.read_excel(filename)

    # Convert column names to lowercase
    df.columns = df.columns.str.lower()

    print("\n### Debug: Full DataFrame ###\n")
    print(df.head())  # Print first few rows for debugging
    print("\n### Debug: Columns in File ###\n", df.columns)

    required_columns = {'product', 'date', 'sales'}
    if not required_columns.issubset(df.columns):
        return jsonify({"error": f"Missing required columns: {required_columns - set(df.columns)}"}), 400

    # Convert data types
    df['date'] = pd.to_datetime(df['date'], errors='coerce')
    df['sales'] = pd.to_numeric(df['sales'], errors='coerce').fillna(0)

    # Total Sales
    total_sales = df['sales'].sum()

    # Sales per product
    product_sales = df.groupby('product')['sales'].sum().reset_index().values.tolist()

    # Products with lower sales
    avg_sales = df['sales'].mean()
    low_sales_products = (
    df[df['sales'] < avg_sales]
    .groupby('product')['sales']
    .sum()
    .reset_index()
    .sort_values(by="sales", ascending=True)  # Sort in ascending order
    .values.tolist()
)


    # Sales Growth Analysis
    df['day'] = df['date'].dt.date
    df['week'] = df['date'].dt.strftime('%Y-%U')
    df['month'] = df['date'].dt.to_period('M')
    df['year'] = df['date'].dt.year

    # Grouped Sales Data
    daily_sales = df.groupby('day')['sales'].sum().reset_index()
    weekly_sales = df.groupby('week')['sales'].sum().reset_index()
    monthly_sales = df.groupby('month')['sales'].sum().reset_index()
    yearly_sales = df.groupby('year')['sales'].sum().reset_index()

    # Calculate Growth Percentage
    def percent_change(series):
        return series.pct_change().fillna(0).replace([np.inf, -np.inf], 0).astype(float).tolist()

    growth_data = {
        "daily_growth": percent_change(daily_sales['sales']),
        "weekly_growth": percent_change(weekly_sales['sales']),
        "monthly_growth": percent_change(monthly_sales['sales']),
        "yearly_growth": percent_change(yearly_sales['sales']),
    }

    # Profit/Loss Analysis
    total_profit_or_loss = total_sales - (len(df) * avg_sales)

    # Convert int64 types for JSON serialization
    def convert_numpy(obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        return obj

    # Prepare output data
    analysis_data = {
        "totalSales": convert_numpy(total_sales),
        "productSales": {
            "headers": ["Product", "Total Sales"],
            "rows": product_sales,
            "summary": "Total sales per product."
        },
        "lowSalesProducts": {
            "headers": ["Product", "Total Sales"],
            "rows": low_sales_products,
            "summary": "Products with lower-than-average sales."
        },
        "growthAnalysis": {
            "daily_growth": growth_data['daily_growth'],
            "weekly_growth": growth_data['weekly_growth'],
            "monthly_growth": growth_data['monthly_growth'],
            "yearly_growth": growth_data['yearly_growth'],
            "summary": "Sales growth trends."
        },
        "profitLoss": {
            "headers": ["Metric", "Value"],
            "rows": [["Profit/Loss", f"${total_profit_or_loss:.2f}"]],
            "summary": "Total profit/loss based on sales data."
        }
    }

    return jsonify(analysis_data)

if __name__ == '__main__':
    app.run(debug=True)


