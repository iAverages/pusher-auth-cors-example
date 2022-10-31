import "./bootstrap";
import Echo from "laravel-echo";

console.log(import.meta.env.VITE_PUSHER_APP_CLUSTER);
const echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    wsHost: `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
    wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
    wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
    authEndpoint: "/api/websocket/auth",
});

console.log("Listening to user.1:message");
echo.channel("test").listen("test2", (e) => {
    console.log("got testing channel");
});
echo.private("chat.1")
    .listen("Message", (e) => {
        console.log("Got message from websocket chat.1:Message");
        console.log(e);
    })
    .subscribed(() => console.log("Subed to channel"))
    .error(console.log);

echo.private("Message")
    .listen("chat.1", (e) => {
        console.log("Got message from websocket Message:chat.1");
        console.log(e);
    })
    .subscribed(() => console.log("Subed to channel2"))
    .error(console.log);
