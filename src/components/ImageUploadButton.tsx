'use client';

import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { HiPhoto } from 'react-icons/hi2';

type Props = {
  onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
};

export default function ImageUploadButton({ onUploadImage }: Props) {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={onUploadImage}
      signatureEndpoint='/api/sign-image'
      uploadPreset='nm-tom'
      className={`
            flex items-center gap-2
                border-secondary border-2
                text-secondary
                rounded-lg
                py-2
                px-4
                hover:bg-secondary/10
                `}>
      <HiPhoto size={28} />
      Upload new image
    </CldUploadButton>
  );
}
