import { GiMatchTip } from 'react-icons/gi';
// prettier-ignore
import { Navbar, NavbarBrand, NavbarContent,} from '@heroui/navbar';
import Link from 'next/link';
// import { Button } from '@heroui/button';
import NavLink from './NavLink';
import { auth } from '@/auth';
import UserMenu from './UserMenu';
import { getUserInfoForNav } from '@/app/actions/userActions';
import FiltersWrapper from './FiltersWrapper';
// import LogoutButton from './Logout';

export default async function TopNav() {
    const session = await auth();
    const userInfo =
        session?.user && (await getUserInfoForNav());

    const memberLinks = [
        { href: '/members', label: 'Matches' },
        { href: '/lists', label: 'Lists' },
        { href: '/messages', label: 'Messages' },
    ];

    const adminLinks = [
        {
            href: '/admin/moderation',
            label: 'Photo Moderation',
        },
    ];

    const links =
        session?.user.role === 'ADMIN'
            ? adminLinks
            : memberLinks;

    return (
        <>
            <Navbar
                maxWidth={'xl'}
                className="bg-gradient-to-r from-purple-400 to-purple-700"
                classNames={{
                    item: [
                        'text-xl',
                        'text-white',
                        'uppercase',
                        'data-[active=true]:text-yellow-200',
                    ],
                }}
            >
                <NavbarBrand as={Link} href="/">
                    <GiMatchTip
                        size={40}
                        className="text-gray-200"
                    />
                    <div className="font-bold text-3xl flex">
                        <span className="text-gray-900">
                            Next
                        </span>
                        <span className="text-gray-200">
                            Match
                        </span>
                    </div>
                </NavbarBrand>

                <NavbarContent justify="center">
                    {links.map(item => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            label={item.label}
                        />
                    ))}
                </NavbarContent>
                <NavbarContent justify="end">
                    {userInfo ? (
                        <UserMenu user={userInfo} />
                    ) : (
                        <>
                            {/* <Button
                                as={Link}
                                href={'/login'}
                                variant={'bordered'}
                                className={'text-white'}
                            >
                                Login
                            </Button>
                            <Button
                                as={Link}
                                href={'/register'}
                                variant={'bordered'}
                                className={'text-white'}
                            >
                                Register
                            </Button> */}
                        </>
                    )}
                    {/* <LogoutButton /> */}
                </NavbarContent>
            </Navbar>
            <FiltersWrapper />
        </>
    );
}
