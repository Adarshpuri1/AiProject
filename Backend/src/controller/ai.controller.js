import { main } from "../services/ai.service.js"

export const AiController = async (req, resp) => {
    try {
        const code = req.body.code;

        if (!code) {
            return resp.status(400).json({ error: "Prompt is required" });
        }

        const response = await main(code);

        // It is better to return JSON for consistency in APIs
        resp.send(response);

    } catch (error) {
        console.error("Controller Error:", error);
        return resp.status(500).json({ 
            error: "Internal Server Error", 
            message: error.message 
        });
    }
}