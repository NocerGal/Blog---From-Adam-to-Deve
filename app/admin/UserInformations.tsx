import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UpdateAdminDatasForm } from './UpdateAdminDatasForm';
import { Session } from 'next-auth';
import { notFound } from 'next/navigation';

export type UserInformationsProps = {
  session: Session;
  userDatas: {
    selfDescription: string | null;
    name: string;
    role: string;
    image: string | null;
  } | null;
};

export const UserInformations = async ({
  session,
  userDatas,
}: UserInformationsProps) => {
  if (!session) {
    notFound();
  }

  return (
    <Card className="flex-[2]">
      <CardHeader>
        <h2>Your informations</h2>
      </CardHeader>
      <CardContent>
        <UpdateAdminDatasForm userDatas={userDatas} />
      </CardContent>
    </Card>
  );
};
