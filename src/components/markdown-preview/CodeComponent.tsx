import React from 'react';
import { PrismLight as SyntaxhighLighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CustomCodeBlockProps = {
  className?: string;
  children: React.ReactNode;
};

const CustomCodeBlock = ({ children }: CustomCodeBlockProps) => {
  return (
    <SyntaxhighLighter language="javascript" style={materialDark}>
      {children as string}
    </SyntaxhighLighter>
  );
};

export default CustomCodeBlock;
