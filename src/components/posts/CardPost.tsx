import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { postType } from '../../../app/post.action';

export type CardPostProps = {
  article: postType;
};

export const CardPost = ({ article }: CardPostProps) => {
  return (
    <Card className="flex flex-col justify-between h-full hover:bg-card-foreground hover:text-card transition-all cursor-pointer">
      <CardHeader className="flex flex-col gap-1 m-0 mb-2 pb-0">
        <CardTitle>{article.title}</CardTitle>
        <CardDescription className="!m-0">
          {article.postDescription.length <= 169
            ? article.postDescription
            : article.postDescription.substring(0, 169) + '...'}
        </CardDescription>
      </CardHeader>

      <div>
        <CardContent className="pt-0 pb-0">
          <CardContent className="p-0 text-right">
            {article.author?.name}
          </CardContent>
        </CardContent>
        <CardFooter className="flex flex-col justify-end items-end">
          <CardTitle className="!m-0 text-xs text-muted-foreground">
            {article.updatedAt.toDateString()}
          </CardTitle>
        </CardFooter>
      </div>
    </Card>
  );
};
