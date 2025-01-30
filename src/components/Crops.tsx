"use client";
import Image from "next/image";
import { use, useRef, useState } from "react";
import { FaLeaf } from "react-icons/fa";

const Crops = ({ name }: { name: string }) => {
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL!}/predict/${name}`,
      {
        method: "POST",
        body: formData,
      }
    );
    setProgress(80);
    const data = await res.json();
    setProgress(100);
    console.log(data);
    setData(data);
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
            className="btn btn-outline text-accent border-4 hover:btn-accent w-auto h-auto m-3 p-3"
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
              <FaLeaf className="w-72 h-72" />
            )}
          </label>
          <input
            accept="image/*"
            onChange={onFileChange}
            ref={imgFile}
            id="cropImg"
            type="file"
            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            required
            placeholder="Upload Image"
          />

          <button className="btn btn-accent m-3 block mx-auto">Upload</button>
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
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="card card-side">
            <figure>
              <Image
                alt="crop photos"
                height={300}
                width={300}
                className="w-72 h-full object-cover"
                src={preview || `/${name}.jpg`}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {data?.class?.name} ({data?.confidence.toFixed(2)}%)
              </h2>
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
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Crops;
