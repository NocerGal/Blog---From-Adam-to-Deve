'use client';

import Markdown from 'react-markdown';
import style from './markdown-styles.module.css';
import CustomCodeBlock from './CodeComponent';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

          return !inline && match ? (
            <CustomCodeBlock>{children}</CustomCodeBlock>
          ) : (
            <code style={materialDark} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {textPreview}
    </Markdown>
  );
}
