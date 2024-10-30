import { useState } from "react";
import type { FormEvent } from "react";

export default function LoginForm() {
    const [responseMessage, setResponseMessage] = useState("");

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const response = await fetch("/api/login", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.message) {
            setResponseMessage(data.message);
        }
    }

    return (
        <form onSubmit={submit}>
            <label>
                Name
                <input type="text" id="name" name="username" required />
            </label>
            <label>
                Email
                <input type="email" id="email" name="email" required />
            </label>
            <button>Send</button>
            {responseMessage && <p>{responseMessage}</p>}
        </form>
    );
}
