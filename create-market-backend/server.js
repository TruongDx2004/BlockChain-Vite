const express = require('express');
const cors = require('cors');
const app = express();

// Sử dụng CORS để cho phép frontend truy cập API
app.use(cors());

// Phân tích dữ liệu dạng JSON
app.use(express.json());

// API POST để nhận dữ liệu từ frontend
app.post('/api/create-market', (req, res) => {
    const marketData = req.body; // Lấy dữ liệu gửi từ frontend

    // Kiểm tra dữ liệu (có thể lưu vào cơ sở dữ liệu ở đây)
    console.log('Received market data:', marketData);

    // Trả về phản hồi thành công (chỉ gửi 1 phản hồi duy nhất)
    return res.status(201).json({
        message: 'Thị trường đã được tạo thành công!',
        result: marketData  // Bao gồm dữ liệu gửi về frontend
    });
});

// Khởi động server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
