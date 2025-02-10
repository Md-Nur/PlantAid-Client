"use client";
import axios from "axios";
import heic2any from "heic2any";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";

const Crops = ({ name }: { name: string }) => {
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [blobFile, setBlobFile] = useState<Blob | null>(null);
  const [converting, setConverting] = useState(false);

  interface CropData {
    class: {
      name: string;
      cause?: string;
      symptoms?: string;
      prevention_management?: string[];
      after_disease_actions?: string[];
      healthy_tips?: string[];
    };
    warn?: string;
    confidence: number;
  }

  const [data, setData] = useState<CropData | null>(null);
  const imgFile = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLDialogElement>(null);

  const onFileChange = async () => {
    const file = imgFile.current?.files ? imgFile.current.files[0] : null;
    if (file) {
      if (file.name.toLowerCase().endsWith(".heic")) {
        // Convert HEIC to JPEG using heic2any
        setConverting(true);
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9, // Adjust quality if needed
        });

        // Create a URL for the converted image
        const imageUrl = URL.createObjectURL(convertedBlob as Blob);
        setBlobFile(convertedBlob as Blob);
        setPreview(imageUrl);
        setConverting(false);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProgress(10);
    const file = imgFile?.current?.files ? imgFile.current.files[0] : null;
    const formData = new FormData();
    setProgress(40);
    if (blobFile) {
      formData.append("file", blobFile);
    } else if (file) {
      formData.append("file", file);
    }
    try {
      setProgress(80);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL!}/plant/${name}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProgress(100);
      setData(res?.data);
    } catch (error) {
      console.error(error);
    }
    modal.current?.showModal();
  };
  return (
    <div>
      {progress === 100 || progress === 0 ? (
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 flex-col justify-center items-center"
        >
          <label
            htmlFor="cropImg"
            className="btn btn-outline text-secondary border-4 hover:btn-secondary w-auto h-auto m-3 p-3"
          >
            {preview ? (
              <Image
                alt="crop photos"
                height={300}
                width={300}
                className="w-72 h-72 object-cover"
                src={preview}
              />
            ) : converting ? (
              <div className="flex flex-col justify-center items-center text-center w-72 h-72">
                <span className="text-secondary">Converting heic to jpg...
                </span>
                <span className="loading loading-bars loading-lg"></span>
              </div>
            ) : (
              <FaUpload className="w-72 h-72" />
            )}
          </label>
          <input
            accept="image/*"
            onChange={onFileChange}
            ref={imgFile}
            id="cropImg"
            type="file"
            // className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            className="hidden"
            required
          />

          <button
            disabled={progress === 100 || !preview}
            className="btn btn-secondary m-3 block mx-auto"
          >
            আপলোড
          </button>
        </form>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div
            className="radial-progress bg-primary text-primary-content border-primary border-4"
            style={{ "--value": progress } as React.CSSProperties}
            role="progressbar"
          >
            {progress}%
          </div>
        </div>
      )}
      <dialog ref={modal} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setPreview(null);
                setData(null);
                setProgress(0);
              }}
            >
              ✕
            </button>
          </form>
          <div className="card card-side flex-wrap">
            <figure className="mx-auto md:mx-0">
              <Image
                alt="crop photos"
                height={300}
                width={300}
                className="w-72 md:w-96 h-full object-cover"
                src={preview || `/${name}.jpg`}
              />
            </figure>
            {data && data?.confidence > 50 ? (
              <div className="card-body my-0 py-0 max-w-xl justify-center">
                {data?.warn && (
                  <h2 className="card-title text-error">{data?.warn}</h2>
                )}
                <h2 className="card-title">{data?.class?.name}</h2>
                {data?.class?.cause && (
                  <p>
                    <span className="font-bold">কারণঃ </span>
                    {data?.class?.cause}
                  </p>
                )}
                {data?.class?.symptoms && (
                  <p>
                    <span className="font-bold">লক্ষণঃ </span>

                    {data?.class?.symptoms}
                  </p>
                )}
                {data?.class?.prevention_management && (
                  <>
                    <span className="font-bold">প্রতিরোধ ও ব্যবস্থাপনাঃ </span>
                    <ul className="list-disc list-inside">
                      {data?.class?.prevention_management.map(
                        (item: string, index: number) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </>
                )}
                {data?.class?.after_disease_actions && (
                  <>
                    <span className="font-bold">প্রতিকারঃ </span>
                    <ul className="list-disc list-inside">
                      {data?.class?.after_disease_actions.map(
                        (item: string, index: number) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </>
                )}
                {data?.class?.healthy_tips && (
                  <>
                    <span className="font-bold">টিপসঃ </span>
                    <ul className="list-disc list-inside">
                      {data?.class?.healthy_tips.map(
                        (item: string, index: number) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </div>
            ) : (
              <div className="card-body">
                <h2 className="card-title">
                  দুঃখিত, আমরা আপনার ছবিতে কোন ফসল চিনতে পারিনি। 😓
                </h2>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Crops;
