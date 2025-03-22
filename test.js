function goToCheckout() {
    // Generate a unique invoice number (timestamp-based)
    const invoiceNumber = 'INV-' + new Date().getTime();

    // Get the current date in a readable format (e.g., DD-MM-YYYY)
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB'); // This will return the date in the format: DD/MM/YYYY

    // Calculate the total price and product details for the invoice
    const invoiceTable = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
                <tr style="background-color: #f4f4f4; border-bottom: 2px solid #ddd;">
                    <th style="padding: 10px; text-align: left;">Product</th>
                    <th style="padding: 10px; text-align: right;">Price (MVR)</th>
                    <th style="padding: 10px; text-align: right;">Quantity</th>
                    <th style="padding: 10px; text-align: right;">Total (MVR)</th>
                </tr>
            </thead>
            <tbody>
                ${cart.map(item => `
                    <tr>
                        <td style="padding: 10px;">${item.name}</td>
                        <td style="padding: 10px; text-align: right;">${item.discountPrice} MVR</td>
                        <td style="padding: 10px; text-align: right;">${item.quantity}</td>
                        <td style="padding: 10px; text-align: right;">${item.discountPrice * item.quantity} MVR</td>
                    </tr>
                `).join('')}
                <tr style="background-color: #f4f4f4; border-top: 2px solid #ddd;">
                    <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                    <td style="padding: 10px; text-align: right; font-weight: bold;">${cart.reduce((total, item) => total + item.discountPrice * item.quantity, 0)} MVR</td>
                </tr>
            </tbody>
        </table>
    `;

    // Create a new window or page
    const invoiceWindow = window.open('', '_blank', 'width=800,height=600');
    invoiceWindow.document.write(`
        <html>
            <head>
                <img src="AZ.png" alt="Company Logo" class="logo">
                <title>Invoice</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        background-color: #f9f9f9;
                    }
                    h2 {
                        text-align: center;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        padding: 10px;
                        text-align: right;
                    }
                    th {
                        background-color: #f4f4f4;
                        border-bottom: 2px solid #ddd;
                    }
                    td {
                        border-bottom: 1px solid #ddd;
                    }
                    .total {
                        font-weight: bold;
                        text-align: right;
                    }
                        .logo {
            display: block;
            margin: 0 auto;
            max-width: 75px; /* Adjust size of the logo */
        }
            .delivery-button {
        background-color: #4CAF50; /* Initial green background */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        transition: transform 0.3s ease;
        animation: colorChange 5s infinite; /* Color change animation */
    }
    .delivery-button:hover {
        transform: scale(1.05); /* Slightly enlarge the button on hover */
    }
    .delivery-button:active {
        transform: scale(0.95); /* Slightly shrink the button when clicked */
    }

    /* Keyframes for color change animation */
    @keyframes colorChange {
        0% { background-color: #4CAF50; } /* Green */
        25% { background-color: #2196F3; } /* Blue */
        50% { background-color: #FF9800; } /* Orange */
        75% { background-color: #9C27B0; } /* Purple */
        100% { background-color: #4CAF50; } /* Back to green */
    }

                </style>
            </head>
            <body>
                <h2>Invoice</h2>
                <p style="text-align: right; font-size: 1.2em; font-weight: bold;">Invoice #: ${invoiceNumber}</p>
<p style="text-align: right; font-size: 1.1em;">Date: ${formattedDate}</p>
                ${invoiceTable}
                
<strong>Bank Account Details:</strong><br>
<span style="font-weight: normal;">Bank Name: BML</span><br>
<span style="font-weight: normal;">Account Number: 
    <span id="accountNumber" style="font-weight: bold; color: blue; cursor: pointer;" onclick="copyAccountNumber()">7701513295101</span>
</span><br>
<span style="font-weight: normal;">Account Holder: LAST HUNT</span>
</p>
            </body>
            <p style="text-align: center; font-size: 1.1em;">Thank you for shopping with us!</p>
                <p style="text-align: left; font-size: 1em; margin-top: 30px;">
<!-- Delivery Button -->
<button class="delivery-button" onclick="window.location.href='entry.html'">Go to Delivery</button>
<!-- Progress Bar -->
<div class="progress-container">
    <div class="progress-bar" id="progressBar"></div>
</div>
</p>

        
        </html>
    `);
}