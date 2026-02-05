import { main } from "../services/ai.service.js"

export const AiController = async (req, resp) => {
    try {
        const prompt = req.query.prompt;

        if (!prompt) {
            return resp.status(400).json({ error: "Prompt is required" });
        }

        const response = await main(prompt);

        // It is better to return JSON for consistency in APIs
        return resp.status(200).json({ 
            success: true,
            message: response 
        });

    } catch (error) {
        console.error("Controller Error:", error);
        return resp.status(500).json({ 
            error: "Internal Server Error", 
            message: error.message 
        });
    }
}