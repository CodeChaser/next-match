import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

/* eslint-disable no-var */
declare global {
    var pusherServerInstance: PusherServer | undefined;
    var pusherClientInstance: PusherClient | undefined;
}

if (!global.pusherServerInstance) {
    global.pusherServerInstance = new PusherServer({
        appId: process.env.PUSHER_APP_ID!,
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
        secret: process.env.PUSHER_SECRET!,
        cluster: 'us3',
        useTLS: true,
    });
}

if (!global.pusherClientInstance) {
    global.pusherClientInstance = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
        channelAuthorization: {
            endpoint: process.env.NEXT_PUBLIC_PUSHER_AUTH_ENDPOINT!,
            transport: 'ajax',
        },
        cluster: 'us3',
    });
}

export const pusherServer = global.pusherServerInstance;
export const pusherClient = global.pusherClientInstance;
