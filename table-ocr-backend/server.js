const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

// פונקציה לקריאת הנתונים מקובץ ה-JSON
const processTableData = (jsonPath) => {
    if (!fs.existsSync(jsonPath)) {
        console.error(`Error: File not found at ${jsonPath}`);
        return [];
    }

    const rawData = fs.readFileSync(jsonPath, "utf-8");
    return JSON.parse(rawData); // המרת JSON לאובייקט
};

// פונקציה ליצירת קובץ אקסל
const createExcel = (tableData) => {
    if (tableData.length === 0) {
        console.error("Error: Table data is empty");
        return;
    }

    const worksheet = XLSX.utils.aoa_to_sheet(tableData); // המרת המידע לגליון עבודה
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table");
    const outputPath = path.join(__dirname, "output_table.xlsx");
    XLSX.writeFile(workbook, outputPath); // יצירת קובץ אקסל
    console.log(`Excel file saved at: ${outputPath}`);
};

// קריאת הנתונים ויצירת האקסל
const jsonPath = path.join(__dirname, "table_structure.json");
const tableData = processTableData(jsonPath);
createExcel(tableData);
