import { error } from "console";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const {query, language} = body;

        if (!query || !language) {
            return NextResponse.json({error: 'No query or language provided'}, {status: 400})
        }

        console.log("User query :- " + query);

        try {
            const response = await axios.post('http://0.0.0.0:8000/api/query', {
              query, // Sending the query as the payload
              language: 'python', // Example: You can replace with dynamic values  as needed
            });

            const aiResponse = response.data.response;
            console.log("Ai response :- " + aiResponse);
            console.log("====================================")
            return NextResponse.json(aiResponse, {status: 200});
            }catch (error) {
                return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
            }
    } catch (error) {
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    };
}