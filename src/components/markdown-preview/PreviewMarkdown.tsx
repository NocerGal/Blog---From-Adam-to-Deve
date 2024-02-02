'use client';

import React, { ReactNode, useState } from 'react';
import Markdown from 'react-markdown';
import style from './preview-markdown-styles.module.css';
import CustomCodeBlock from './CodeComponent';

type FormComponentType = {
  textPreview?: string;
};

export default function UpdatePostPreviewMarkdown(props: FormComponentType) {
  return (
    <div>
      <Markdown
        className={style.reactMarkDown}
        components={{
          code: CustomCodeBlock,
        }}
      >
        {`${props.textPreview}`}
      </Markdown>
    </div>
  );
}
