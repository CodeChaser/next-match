'use client';

import { useSession, getSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useEffect, useState } from 'react';

export default function ClientSession() {
    const { data: session, status } = useSession();
    // prettier-ignore
    const [freshSession, setFreshSession] =
        useState<Session | null>(session);

    useEffect(() => {
        const syncSession = async () => {
            const updatedSession = await getSession();
            setFreshSession(updatedSession);
        };

        syncSession();
    }, []);

    return (
        <div className="bg-blue-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto">
            <h3 className="text-2xl font-semibold">
                Client session data:
            </h3>
            {status === 'loading' ? (
                <div>Loading session...</div>
            ) : freshSession ? (
                <pre>
                    {JSON.stringify(freshSession, null, 2)}
                </pre>
            ) : (
                <div>Not signed in</div>
            )}
        </div>
    );

    // return (
    //     <div className="bg-blue-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto">
    //         <h3 className="text-2xl font-semibold">
    //             Client session data:
    //         </h3>
    //         {session ? (
    //             <div>
    //                 <pre>
    //                     {JSON.stringify(session, null, 2)}
    //                 </pre>
    //             </div>
    //         ) : (
    //             <div>Not signed in</div>
    //         )}
    //     </div>
    // );
}
