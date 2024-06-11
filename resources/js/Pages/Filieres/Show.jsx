import DOMPurify from "dompurify";

export default function Show({ filiere = {} }) {
  console.log(filiere);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(filiere.details) }} />
    </div>
  );
}
