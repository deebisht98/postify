import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  id: string;
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="pu6mt4ae"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <>
            {value ? (
              <div className="w-full mb-4 relative h-full">
                <Image
                  alt="upload"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  src={value}
                />
              </div>
            ) : (
              <div
                onClick={() => open?.()}
                className="w-full h-full mb-4 relative cursor-pointer hover:opacity-70 border-dashed border-2 flex flex-col justify-center items-center"
              >
                <TbPhotoPlus />
                <div className="text-lg">Click to upload</div>
              </div>
            )}
          </>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
