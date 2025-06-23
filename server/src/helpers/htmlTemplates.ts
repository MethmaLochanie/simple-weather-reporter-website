// Helper function to generate HTML response for email verification
export const generateHtmlResponse = (isSuccess: boolean, title: string, message: string, error?: string) => {
  const backgroundColor = isSuccess 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
  const icon = isSuccess ? '✅' : '❌';
  const iconColor = isSuccess ? '#28a745' : '#dc3545';
  const buttonColor = isSuccess ? '#007bff' : '#dc3545';
  const buttonHoverColor = isSuccess ? '#0056b3' : '#c82333';
  const displayMessage = isSuccess ? message : error || message;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - Weather Reporter</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: ${backgroundColor};
          margin: 0;
          padding: 20px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          text-align: center;
          max-width: 500px;
          width: 100%;
        }
        .icon {
          color: ${iconColor};
          font-size: 48px;
          margin-bottom: 20px;
        }
        h1 {
          color: #333;
          margin-bottom: 20px;
        }
        p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .btn {
          background: ${buttonColor};
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 5px;
          display: inline-block;
          transition: background 0.3s;
        }
        .btn:hover {
          background: ${buttonHoverColor};
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">${icon}</div>
        <h1>${title}</h1>
        <p>${displayMessage}</p>
        <p>${isSuccess ? 'You can now log in to your Weather Reporter account.' : 'Please try registering again or contact support if the problem persists.'}</p>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="btn">
          Go to Weather Reporter
        </a>
      </div>
    </body>
    </html>
  `;
}; 