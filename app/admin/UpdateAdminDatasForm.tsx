'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AdminFormSchema, zodAdminFormSchema } from './admin.schema';
import { adminActionEditUserDatas } from './admin.action';
import { toast } from 'sonner';

type UpdateAdminDatasFormPropsTypes = {
  userDatas: UserDatas;
};

type UserDatas = {
  role: string;
  selfDescription: string | null;
  name: string | null;
  image: string | null;
} | null;

export const UpdateAdminDatasForm = ({
  userDatas,
}: UpdateAdminDatasFormPropsTypes) => {
  const router = useRouter();
  const [buttonMessage, setButtonMessage] = useState('Save changes');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<AdminFormSchema>({
    resolver: zodResolver(zodAdminFormSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful === false) {
      return;
    } else {
      setButtonMessage('Success!');

      setTimeout(() => {
        setButtonMessage('Save changes');
      }, 3000);
    }
  }, [isSubmitSuccessful]);

  if (userDatas === null) return <p>Error to get userDatas</p>;
  return (
    <form
      onSubmit={handleSubmit(async (formDatas) => {
        const { data } = await adminActionEditUserDatas(formDatas);
        if (!data) {
          toast.error("You didn't success to update your profile");
        }
        toast.success('You succeed to update your profile');
        adminActionEditUserDatas(formDatas);
        router.refresh();
      })}
    >
      <fieldset disabled={isSubmitting}>
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
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : buttonMessage}
        </button>
      </fieldset>
    </form>
  );
};
