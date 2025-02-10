"use client";

import dynamic from "next/dynamic";
import Title from "@/components/Title";
const Crops = dynamic(() => import("@/components/Crops"), {
  ssr: false,
});
const Potato = () => {
  return (
    <>
      <Title>আলু পাতার ছবি আপলোড করুন</Title>
      <Crops name="potato" />
    </>
  );
};

export default Potato;
