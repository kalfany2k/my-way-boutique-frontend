import React, { useEffect, useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface CustomFileInputProps {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  name: string;
  accept: string;
  multiple?: boolean;
  error?: string;
  submitSuccess: boolean;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  id,
  label,
  register,
  name,
  accept,
  multiple = false,
  error,
  submitSuccess,
}) => {
  // reference for input field that is hidden
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);

  useEffect(() => {
    setFileNames([]);
  }, [submitSuccess]);

  // clicking select will click the hidden input
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // register the field based on the changes
  const { ref, onChange, ...rest } = register(name, {
    required: "Acest câmp este obligatoriu",
  });

  // handle file change, if there are none, don't change the file names.
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (files.length > 0) {
        setFileNames(Array.from(files).map((file) => file.name));
        onChange(event);
      }
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="pointer-events-none mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleButtonClick}
          className="rounded-md bg-warm-nude-600 px-4 py-2 text-white hover:bg-warm-nude-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          {multiple ? "Selectează fișierele" : "Selectează fișierul"}
        </button>
        <div className="ml-1 flex flex-col">
          {fileNames.length === 0 ? (
            <span className="ml-1 text-sm text-gray-500">
              {multiple ? "Niciun fișier selectat" : "Niciun fișier selectat"}
            </span>
          ) : (
            fileNames.map((fileName, index) => (
              <span className="ml-1" key={index}>
                {fileName}
              </span>
            ))
          )}
        </div>
      </div>
      <input
        type="file"
        id={id}
        accept={accept}
        multiple={multiple}
        className="sr-only"
        ref={(e) => {
          ref(e);
          fileInputRef.current = e;
        }}
        onChange={handleFileChange}
        {...rest}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomFileInput;
