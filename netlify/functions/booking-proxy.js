// netlify/functions/booking-proxy.js
export async function handler(event, context) {
    if (event.httpMethod === "OPTIONS") {
        // Handle CORS preflight
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            body: "",
        };
    }

    if (event.httpMethod === "POST") {
        try {
            const data = JSON.parse(event.body);

            // Forward to Google Apps Script endpoint
            const response = await fetch("https://script.google.com/macros/s/AKfycbx0aT6FzpsStIUMDIXZSQVrKTvg_SHZphvC5zyJPVdxFxZ6-DilpsOQCiBTvUP4sNCF/exec", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const text = await response.text();

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: text,
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: "Error: " + err.message,
            };
        }
    }

    return { statusCode: 405, body: "Method Not Allowed" };
}
