import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        disabled={disabled}
        placeholder=" "
        type={type}
        {...register(id, { required })}
        className={clsx(
          "peer w-full p-4 pt-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed",
          errors[id] ? "border-rose-500" : "border-neutral-300",
          errors[id] ? "focus:border-rose-500" : "focus:border-black"
        )}
      />
      <label
        className={clsx(
          "absolute text-md duration-150 transform -translate-y-4 top-4 left-3 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
          errors[id] ? "text-rose-500" : "text-zinc-400"
        )}
      >
        {label}
      </label>
    </div>
  );
};
