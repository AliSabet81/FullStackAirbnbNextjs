"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/input";
import { toast } from "react-hot-toast";
import Button from "../Button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setISLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setISLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((err) => {
        toast.error("something Went Wrong.");
      })
      .finally(() => {
        setISLoading(false);
      });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome To Airbnb" subtitle="Create an Account" center />
      <Input
        errors={errors}
        required
        register={register}
        id="email"
        lable="Email"
        disabled={isLoading}
      />
      <Input
        errors={errors}
        required
        register={register}
        id="name"
        lable="Name"
        disabled={isLoading}
      />
      <Input
        type="password"
        errors={errors}
        required
        register={register}
        id="password"
        lable="Password"
        disabled={isLoading}
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex justify-center items-center gap-2">
          <div>Already Have an Account</div>
          <div
            onClick={registerModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline">
            Log In
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disable={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
