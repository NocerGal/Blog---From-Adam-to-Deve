'use client';

import React, { ReactNode, useState } from 'react';
import Markdown from 'react-markdown';
import style from './preview-markdown-styles.module.css';

type FormComponentType = {
  textPreview?: string;
};

export default function UpdatePostPreviewMarkdown(props: FormComponentType) {
  return (
    <div>
      <Markdown
        className={style.reactMarkDown}
      >{`${props.textPreview}`}</Markdown>
    </div>
  );
}
