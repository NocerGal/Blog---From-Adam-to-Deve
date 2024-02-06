'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { setSourceMapsEnabled } from 'process';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { ZodType, z } from 'zod';

type UpdateAdminDatasFormPropsTypes = {
  userDatas: UserDatas;
  revalidathPath: () => void;
};

type UserDatas = {
  role: string;
  selfDescription: string | null;
  name: string | null;
  image: string | null;
} | null;

type FormSchema = {
  selfDescription?: string;
  name: string;
  image?: string;
};

export const UpdateAdminDatasForm = ({
  userDatas,
  revalidathPath,
}: UpdateAdminDatasFormPropsTypes) => {
  const [buttonMessage, setButtonMessage] = useState('Save changes');
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const zodFormSchema: ZodType<FormSchema> = z.object({
    selfDescription: z.string().min(10).optional(),
    name: z.string().min(2),
    image: z.string().url().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(zodFormSchema),
  });

  useEffect(() => {
    if (isSubmitting === false) {
      return;
    } else {
      setButtonMessage('Success!');
      setIsSubmitSuccessful(true);
      setTimeout(() => {
        setButtonMessage('Save changes');
        setIsSubmitSuccessful(false);
      }, 3000);
    }
  }, [isSubmitting]);

  const handleUpdateUser = async (data: FormSchema) => {
    await fetch('/api/user/updateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    revalidathPath();
  };

  if (userDatas === null) return <p>Error to get userDatas</p>;
  return (
    <form onSubmit={handleSubmit(handleUpdateUser)}>
      <div className="mb-4">
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="userName">Username</Label>
            <Input
              defaultValue={userDatas.name ?? 'Your username'}
              id="userName"
              {...register('name')}
            />
            {errors.name?.message && (
              <span className="flex text-destructive font-semibold mt-1">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <Label>User Type</Label>
            <Input type="text" value={userDatas.role} disabled />
          </div>
          <div>
            <Label htmlFor="urlImage">Image</Label>
            <Input
              defaultValue={userDatas.image ?? 'no image URL'}
              id="urlImage"
              {...register('image')}
            />
            {errors.image?.message && (
              <span className="flex text-destructive font-semibold mt-1">
                {errors.image.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="urlImage">Your self descrption</Label>
            <Input
              defaultValue={
                userDatas.selfDescription ? userDatas.selfDescription : ''
              }
              placeholder="Your self descrption"
              id="selfDescription"
              {...register('selfDescription')}
            />
            {errors.selfDescription?.message && (
              <span className="flex text-destructive font-semibold mt-1">
                {errors.selfDescription.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="flex justify-center bg-muted rounded-[0.5rem] py-1 px-2 hover:bg-muted-foreground hover:text-foreground transition-all min-w-[102px] max-w-[117px]"
        disabled={isSubmitSuccessful ? true : false}
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : buttonMessage}
      </button>
    </form>
  );
};
