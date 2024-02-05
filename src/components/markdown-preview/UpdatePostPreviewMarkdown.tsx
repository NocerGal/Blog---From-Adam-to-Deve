'use client';

import StyledMarkdown from './StyledMarkdown';

type FormComponentType = {
  textPreview: string;
};

export default function UpdatePostPreviewMarkdown({
  textPreview,
}: FormComponentType) {
  return <StyledMarkdown textPreview={textPreview} />;
}
