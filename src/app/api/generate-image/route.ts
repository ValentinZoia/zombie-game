import { GAME_PROMPTS } from "@/lib/prompts";
import { GenerateImageRequest } from "@/lib/types";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";

export async function POST(request: NextRequest) {
  try {
    const { imagePrompt }: GenerateImageRequest = await request.json();

    const prompt = GAME_PROMPTS.GENERATE_IMAGE(imagePrompt);

    const { files } = await generateText({
      model: google("gemini-1.5-flash-latest"),
      prompt,
      providerOptions: {
        google: {
          responseModalities: ["IMAGE"],
        },
      },
    });

    console.log("Generated images: ", files);

    return NextResponse.json({ image: files[0] || null });
  } catch (error) {
    console.log("Error generating story", error);
    return NextResponse.json(
      { error: "Error generating story" },
      { status: 500 }
    );
  }
}
