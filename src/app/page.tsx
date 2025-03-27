import { auth } from '@/auth';
import { Button } from '@heroui/button';
import SessionData from '@/components/SessionData';
import Link from 'next/link';
import { GiMatchTip } from 'react-icons/gi';

export default async function Home() {
    const session = await auth();

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-20 gap-6 text-secondary">
                <GiMatchTip size={100} />
                <h1 className="text-4xl font-bold">
                    Welcome to NextMatch
                </h1>
                {session ? (
                    <Button
                        as={Link}
                        href="/members"
                        size="lg"
                        color="secondary"
                        variant="bordered"
                    >
                        Continue
                    </Button>
                ) : (
                    <div className="flex flex-row gap-4">
                        <Button
                            as={Link}
                            href="/login"
                            size="lg"
                            color="secondary"
                            variant="bordered"
                        >
                            Sign in
                        </Button>
                        <Button
                            as={Link}
                            href="/register"
                            size="lg"
                            color="secondary"
                            variant="bordered"
                        >
                            Register
                        </Button>
                    </div>
                )}
            </div>

            <SessionData />
        </>
    );
}

// import { auth } from '@/auth';
// import ClientSession from '@/components/ClientSession';

// export default async function Home() {
//     const session = await auth();

//     return (
//         <div className="flex flex-row justify-around mt-20 gap-6">
//             <div className="bg-green-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto">
//                 <h3 className="text-2xl font-semibold">
//                     Server session data:
//                 </h3>
//                 {session ? (
//                     <div>
//                         <pre>
//                             {JSON.stringify(
//                                 session,
//                                 null,
//                                 2,
//                             )}
//                         </pre>
//                     </div>
//                 ) : (
//                     <div>Not signed in</div>
//                 )}
//             </div>
//             <ClientSession />
//         </div>
//     );
// }
