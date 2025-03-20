import { getMemberByUserId, getMemberPhotosByUserId } from '@/app/actions/memberActions';
import MemberPhotoUpload from './MemberPhotoUpload';
import MemberPhotos from '@/components/MemberPhotos';
import { getAuthUserId } from '@/app/actions/authActions';
import { Divider } from '@heroui/divider';
import { CardBody, CardHeader } from '@heroui/card';

export const dynamic = 'force-dynamic';

export default async function PhotosPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className='flex flex-row justify-between items-center'>
        <MemberPhotoUpload />
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image} />
      </CardBody>
    </>
  );
}
