"use client";
import Button from "@/components/Button";
import { useState } from "react";
import CreateTweet from "./action";
import { useFormState } from "react-dom";
import Input from "@/components/Input";
import createTweet from "./action";



export default function Upload() {
  
    const [preview, setPreview] = useState("");
    const [state, trigger] = useFormState(createTweet, null);
    
    const onImgChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      console.log("onImgChange!");
      const {target : {files}} = event;

      if(files?.length){
        const file = files[0];
        const url = URL.createObjectURL(file);
        setPreview(url);
      }
    };


    return (
        // <div className="flex flex-col items-center justify-center p-2 py-5 m-4 my-5 max-w-screen-sm">
          <div className="flex flex-col items-center justify-between p-3">
          <form action={trigger} className="p-5 flex flex-col gap-5">
            <label htmlFor="photo" 
                   className="size-72 border-2 aspect-square rounded-full flex 
                              items-center justify-center flex-col text-neutral-300
                               border-neutral-300 border-dashed cursor-pointer bg-center bg-cover"
                   style={{
                      backgroundImage: `url(${preview})`,

                    }}>
            {preview === "" ? (
                <>
                <svg className="hover:text-orange-200 justify-center align-middle" data-slot="icon" fill="none" strokeWidth="1" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"></path>
                </svg>  
                <div className="text-neutral-400 text-sm">{state?.fieldErrors.photo}</div>
                </>
              ) : null}
            </label>
            <input
                onChange={onImgChange}
                id="photo"
                name="photo"
                type="file"
                className="hidden"
                accept="image/*"
              />
            <Input 
                type="text"
                name="title" 
                placeholder="Title"
                errors={state?.fieldErrors.title}
              />
            <Input 
                type="text"
                name="contents" 
                placeholder="whassup"
                errors={state?.fieldErrors.contents}
            />
            <Button text="Post" />
            </form>
        </div>
        )
}