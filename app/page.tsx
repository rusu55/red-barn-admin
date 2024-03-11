'use client';

import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function Home() {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged In");
        //router.refresh();    
        router.push('/contact')
         
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/20">
      <div className="w-full max-w-2xl md:w-3/4 lg:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <div className="flex flex-col w-full outline-none focus:outline-none bg-white rounded-lg border-0 shadow-lg h-full md:h-auto ">
          <div className="flex items-center p-6 rounded-t justify-center border-b-[1px]">
            <div className="text-lg font-semibold">Login</div>
          </div>
            {/* Body */}            
              <div className="p-6 flex-auto ">
                <div className="flex flex-col gap-4">
                    <Input
                      id="email"
                      label="Email"
                      register={register}
                      errors={errors}
                      required
                    />
                    <Input
                      id="password"
                      label="Password"
                      register={register}
                      errors={errors}
                      required
                      type="password"
                    />
                  </div>
              </div>            
             {/* Footer */}
             <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center w-full gap-4">
                  <Button onClick={handleSubmit(onSubmit)}>Login</Button>
                </div>                
             </div>
          </div>
        </div>
        
    </div>
  );
}
