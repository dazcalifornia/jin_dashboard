import React, { useState } from 'react';
import XLSX from 'xlsx';

function FileUpload() {
  const [jsonData, setJsonData] = useState(null);

  const handleExcel = (event) => {
    event.preventDefault();
    const file = event.target.file.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setJsonData(rows);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <form onSubmit={handleExcel}>
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form>
      {jsonData && (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      )}
    </div>
  );
}

export default FileUpload;
