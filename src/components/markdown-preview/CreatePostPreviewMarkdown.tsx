import Markdown from 'react-markdown';
import style from './preview-markdown-styles.module.css';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import CustomCodeBlock from './CodeComponent';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type FormComponentType = {
  textPreview: string;
};

export default function CreatePostPreviewMarkdown(props: FormComponentType) {
  const markdown = `${props.textPreview}`;

  return (
    <div>
      <div>
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
          {markdown}
        </Markdown>
      </div>
    </div>
  );
}
