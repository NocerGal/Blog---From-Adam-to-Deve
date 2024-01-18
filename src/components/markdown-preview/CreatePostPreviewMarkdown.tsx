import React, { ReactNode, useState } from 'react';
import Markdown from 'react-markdown';
import style from './preview-markdown-styles.module.css';

type FormComponentType = {
  textPreview: string;
};

export default function CreatePostPreviewMarkdown(props: FormComponentType) {
  const markdown = `${props.textPreview}`;
  return (
    <div>
      <Markdown className={style.reactMarkDown}>{markdown}</Markdown>
    </div>
  );
}
