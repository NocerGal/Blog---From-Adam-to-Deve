'use client';

import Markdown from 'react-markdown';
import style from './markdown-styles.module.css';
import CustomCodeBlock from './CodeComponent';

type StyledMarkdownPropsTypes = {
  textPreview: string;
};

export default function StyledMarkdown({
  textPreview,
}: StyledMarkdownPropsTypes) {
  return (
    <Markdown
      className={style.reactMarkDown}
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline ? (
            <CustomCodeBlock>{children}</CustomCodeBlock>
          ) : (
            <code {...props}>{children}</code>
          );
        },
      }}
    >
      {textPreview}
    </Markdown>
  );
}
