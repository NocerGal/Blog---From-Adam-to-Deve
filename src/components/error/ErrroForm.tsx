type ErrorFormPropsTypes = {
  error?: string[];
};

export default function ErrorForm(props: ErrorFormPropsTypes) {
  if (!props.error?.length) return null;
  return (
    <div>
      {props.error.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}
