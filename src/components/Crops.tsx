"use client";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";

const Crops = ({ name }: { name: string }) => {
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  interface CropData {
    class: {
      name: string;
      cause?: string;
      symptoms?: string;
      prevention_management?: string[];
      after_disease_actions?: string[];
      healthy_tips?: string[];
    };
    confidence: number;
  }

  const [data, setData] = useState<CropData | null>(null);
  const imgFile = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLDialogElement>(null);

  const onFileChange = () => {
    const file = imgFile.current?.files ? imgFile.current.files[0] : null;
    if (file) {
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
    if (file) {
      formData.append("file", file);
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL!}/predict/${name}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProgress(80);
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
                className="w-72"
                src={preview}
              />
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
              <div className="card-body my-0 py-0 max-w-xl">
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
