import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const username = data.get("username");
    const password = data.get("email");
    console.log("data", data, password, username);

    if (!username || !password) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 },
        );
    }

    return new Response(
        JSON.stringify({
            message: "Success!",
        }),
        { status: 200 },
    );
};
