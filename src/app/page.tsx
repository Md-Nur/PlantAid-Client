
import Image from "next/image";
import Link from "next/link";

const crop = [
  {
    name: "আলু",
    image: "/potato.jpg",
    url: "/potato",
  },
  {
    name: "টমেটো",
    image: "/tomato.jpg",
    url: "/tomato",
  },
  {
    name: "মরিচ",
    image: "/pepper.jpg",
    url: "/pepper",
  },
  {
    name: "অন্যান্য",
    image: "/logo.png",
    url: "/other-plants",
  },
];

export default function Home() {
  return (
    <section className="my-10 w-full">
      <p className="text-2xl text-center max-w-5xl mx-auto my-10">
        প্ল্যান্ট এইড হলো কৃত্তিম বুদ্ধিমত্তা ভিত্তিক একটা সার্ভিস যেটা ফসলের
        (আলু, টমেটো, মরিচ) পাতার ছবি এর মাধ্যমে ওই ফসলের রোগ শনাক্ত করতে
        সক্ষম।
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {crop.map((crop, i) => (
          <Link
            href={crop.url}
            className="card bg-base-100 image-full w-full max-w-96 shadow-xl h-96"
            key={i}
          >
            <figure>
              <Image
                height={500}
                width={500}
                src={crop.image}
                alt={crop.name}
              />
            </figure>
            <div className="card-body justify-center items-center  hover:shadow-xl">
              <h2 className="card-title text-4xl font-bold hover:scale-105 hover:text-accent">
                {crop.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
