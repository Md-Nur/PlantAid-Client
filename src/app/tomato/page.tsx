"use client";
import Title from "@/components/Title";
import dynamic from "next/dynamic";

// Dynamically import the component with SSR disabled
const Crops = dynamic(() => import("@/components/Crops"), {
  ssr: false,
});
const Tomato = () => {
  return (
    <>
      <Title>টমেটো পাতার ছবি আপলোড করুন</Title>
      <Crops name="tomato" />
    </>
  );
};

export default Tomato;
