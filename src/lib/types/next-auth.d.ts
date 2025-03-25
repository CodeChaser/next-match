import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        profileComplete: boolean;
        role: string;
    }

    interface Session {
        user: {
            profileComplete: boolean;
            role: string;
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        profileComplete: boolean;
        role: string;
    }
}
