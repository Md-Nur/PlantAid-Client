"use client";
// import Crops from "@/components/Crops";
import Title from "@/components/Title";
import dynamic from "next/dynamic";

// Dynamically import the component with SSR disabled
const Crops = dynamic(() => import("@/components/Crops"), {
  ssr: false,
});
const OtherPlants = () => {
  return (
    <>
      <Title>আপনি নিম্নলিখিত ফসলের পাতার ছবি আপলোড করতে পারেন:</Title>
      <p className="text-center text-xl md:text-2xl font-bold my-5">
        আপেল, ব্লুবেরি, চেরি, ভুট্টা, আঙ্গুর, কমলা, পীচ, মরিচ, আলু, রাস্পবেরি,
        সয়াবিন, স্কোয়াশ, স্ট্রবেরি, টমেটো।
      </p>
      <Crops name="other" />
    </>
  );
};

export default OtherPlants;
