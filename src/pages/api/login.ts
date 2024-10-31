import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();

    const username = data.get("username");
    const password = data.get("password");

    if (!username || !password) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 },
        );
    }
    const response = await fetch(
        `${import.meta.env.BACKEND_API_BASE_URL}/token`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                username: String(username),
                password: String(password)
            }),
        }
    )
    .then(response => {
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        return response.json();
    })

    return new Response(JSON.stringify(response));
};
