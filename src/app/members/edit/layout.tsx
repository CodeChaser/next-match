import { ReactNode } from 'react';
import { getMemberByUserId } from '@/app/actions/memberActions';
import MemberSidebar from '@/app/members/MemberSidebar';
import { notFound } from 'next/navigation';
import { Card } from '@heroui/card';
import { getAuthUserId } from '@/app/actions/authActions';

export const dynamic = 'force-dynamic';

export default async function Layout({ children }: { children: ReactNode }) {
  const userId = await getAuthUserId();

  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  const basePath = `/members/edit`;

  const navLinks = [
    { name: 'Edit Profile', href: `${basePath}` },
    { name: 'Update Photos', href: `${basePath}/photos` },
  ];

  return (
    <div className='grid grid-cols-12 gap-5 h-[80vh]'>
      <div className='col-span-3'>
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className='col-span-9'>
        <Card className='w-full mt-10 h-[80vh]'>{children}</Card>
      </div>
    </div>
  );
}
