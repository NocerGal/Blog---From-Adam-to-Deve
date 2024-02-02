import React from 'react';
import { PrismLight as SyntaxhighLighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CustomCodeBlockProps = {
  className?: string;
  children: React.ReactNode;
};

const CustomCodeBlock = ({ children }: CustomCodeBlockProps) => {
  return (
    <SyntaxhighLighter
      language={'javascript'}
      // eslint-disable-next-line react/no-children-prop
      // children={children}
      style={materialDark}
    >
      {children as string}
    </SyntaxhighLighter>
  );
};

export default CustomCodeBlock;
