"use client";
// import Crops from "@/components/Crops";
import Title from "@/components/Title";
import dynamic from "next/dynamic";

// Dynamically import the component with SSR disabled
const Crops = dynamic(() => import("@/components/Crops"), {
  ssr: false,
});
const Pepper = () => {
  return (
    <>
      <Title>মরিচ পাতার ছবি আপলোড করুন</Title>
      <Crops name="pepper" />
    </>
  );
};

export default Pepper;
