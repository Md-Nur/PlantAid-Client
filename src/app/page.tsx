import Title from "@/components/Title";
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
];

export default function Home() {
  return (
    <section>
      <Title>প্ল্যান্ট এইড - গ্রিন স্পার্ক</Title>
      <div className="flex flex-wrap justify-center gap-4">
        {crop.map((crop, i) => (
          <Link
            href={crop.url}
            className="card bg-base-100 image-full w-full max-w-96 shadow-xl h-72"
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
