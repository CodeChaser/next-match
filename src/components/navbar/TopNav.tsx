import { GiMatchTip } from 'react-icons/gi';
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu } from '@heroui/navbar';
import Link from 'next/link';
import NavLink from './NavLink';
import { Button } from '@heroui/button';
import UserMenu from './UserMenu';
import { auth } from '@/auth';
import { getUserInfoForNav } from '@/app/actions/userActions';

export default async function TopNav() {
  const session = await auth();
  const userInfo = session?.user && (await getUserInfoForNav());

  return (
    <Navbar
      maxWidth={'xl'}
      className='bg-gradient-to-r from-purple-400 to-purple-700'
      classNames={{
        item: ['text-base sm:text-lg', 'text-white', 'uppercase', 'data-[active=true]:text-yellow-200'],
      }}
      isBordered>
      <NavbarBrand as={Link} href='/'>
        <GiMatchTip size={40} className='text-gray-200' />
        <div className='font-bold text-3xl flex'>
          <span className='text-gray-900'>Next</span>
          <span className='text-gray-200'>Match</span>
        </div>
      </NavbarBrand>

      <NavbarMenuToggle className='sm:hidden' />

      <NavbarContent justify='center' className='hidden sm:flex gap-4'>
        <NavLink href='/members' label='Matches' />
        <NavLink href='/lists' label='Lists' />
        <NavLink href='/messages' label='messages' />
      </NavbarContent>

      <NavbarContent justify='end' className='hidden sm:flex gap-2'>
        {userInfo ? (
          <UserMenu user={userInfo} />
        ) : (
          <>
            <Button as={Link} href={'/login'} variant={'bordered'} className={'text-white'}>
              Login
            </Button>
            <Button as={Link} href={'/register'} variant={'bordered'} className={'text-white'}>
              Register
            </Button>
          </>
        )}
      </NavbarContent>

      <NavbarMenu className='sm:hidden flex flex-col gap-3 p-4'>
        <NavLink href='/members' label='Matches' />
        <NavLink href='/lists' label='Lists' />
        <NavLink href='/messages' label='Messages' />

        {!session?.user && (
          <>
            <Button as={Link} href='/login' variant='bordered' className='text-white w-full'>
              Login
            </Button>
            <Button as={Link} href='/register' variant='bordered' className='text-white w-full'>
              Register
            </Button>
          </>
        )}

        {session?.user && <UserMenu user={session.user} />}
      </NavbarMenu>
    </Navbar>
  );
}
