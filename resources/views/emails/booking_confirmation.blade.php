<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
        .header { background-color: #0f172a; color: #ffffff; padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase; }
        .content { padding: 30px; background-color: #ffffff; }
        .booking-details { background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #edf2f7; }
        .detail-item { margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; display: flex; justify-content: space-between; }
        .detail-item:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; }
        .value { color: #1e293b; font-weight: 600; }
        .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; }
        .total-box { text-align: right; margin-top: 15px; }
        .total-price { font-size: 20px; font-weight: 800; color: #2563eb; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Canada Premium Limo</h1>
        </div>

        <div class="content">
            <p>Dear <strong>{{ $booking->customer_name }}</strong>,</p>
            <p>Thank you for choosing our premium service. Your reservation has been successfully received and is currently being processed by our team.</p>
            
            <div class="booking-details">
                <div class="detail-item">
                    <span class="label">Reservation ID</span>
                    <span class="value">#{{ $booking->id }}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Vehicle Class</span>
                    <span class="value">{{ $booking->car->model_name }}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Pickup Time</span>
                    <span class="value">{{ \Carbon\Carbon::parse($booking->pickup_time)->format('M d, Y H:i') }}</span>
                </div>
                @if($booking->flight_number)
                <div class="detail-item">
                    <span class="label">Flight Number</span>
                    <span class="value">{{ $booking->flight_number }}</span>
                </div>
                @endif
                <div class="detail-item">
                    <span class="label">From</span>
                    <span class="value">{{ $booking->pickup_address }}</span>
                </div>
                <div class="detail-item">
                    <span class="label">To</span>
                    <span class="value">{{ $booking->destination_address }}</span>
                </div>

                <div class="total-box">
                    <span class="label">Total Amount</span><br>
                    <span class="total-price">${{ number_format($booking->total_price, 2) }} CAD</span>
                </div>
            </div>

            <p>Our professional chauffeur will contact you shortly before the scheduled time.</p>
        </div>

        <div class="footer">
            &copy; 2026 Canada Premium Limousine Service. All rights reserved.<br>
            24/7 Support: +1 (555) 000-0000 | Toronto, Canada
        </div>
    </div>
</body>
</html>