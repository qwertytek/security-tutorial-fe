import type { FormEvent } from "react";

export default function LoginForm() {
    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const response = await fetch("/api/login", {
            method: "POST",
            body: formData,
        });

        if(response.statusText !== 'OK') {
            throw new Error(`Failed to login: ${response.statusText}`);
        }

        const token = await response.json()['access_token'];

        localStorage.setItem('access_token', token);

        window.location.replace(import.meta.env.BASE_URL)
    }

    return (
        <form onSubmit={submit}>
            <label>
                Name
                <input type="text" id="name" name="username" required />
            </label>
            <label>
                Password
                <input type="password" id="password" name="password" required />
            </label>
            <button>Send</button>
        </form>
    );
}
