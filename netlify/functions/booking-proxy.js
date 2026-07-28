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

            // Honeypot: real visitors never fill this hidden field. Spam bots that
            // fill every input do. Pretend success so they don't learn to skip it,
            // but drop the submission instead of forwarding it.
            if (data["bot-field"]) {
                return {
                    statusCode: 200,
                    headers: { "Access-Control-Allow-Origin": "*" },
                    body: "Success",
                };
            }

            if (!data.name || !data.email) {
                return {
                    statusCode: 400,
                    headers: { "Access-Control-Allow-Origin": "*" },
                    body: "Error: name and email are required",
                };
            }

            const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
            if (!scriptUrl) {
                return {
                    statusCode: 500,
                    headers: { "Access-Control-Allow-Origin": "*" },
                    body: "Error: GOOGLE_SCRIPT_URL is not configured",
                };
            }

            // Forward to Google Apps Script endpoint
            const response = await fetch(scriptUrl, {
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
