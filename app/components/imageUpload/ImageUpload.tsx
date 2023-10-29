import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
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
            {value && (
              <div className="w-full h-full mb-4">
                <Image
                  alt="upload"
                  width={350}
                  height={250}
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
            <div
              onClick={() => open?.()}
              className="relative cursor-pointer hover:opacity-70 border-dashed border-2 flex flex-col justify-center items-center h-full"
            >
              <TbPhotoPlus />
              <div className="text-lg">Click to upload</div>
            </div>
          </>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
