import { PageTitle } from "@/components/Front_End/PageTitle";
import Section from "@/components/Front_End/Section";
import { Head } from "@inertiajs/react";

export default function PageLayout({ children, title,image }) {
  return (
    <>
      <Head title={title} />
      {title && <PageTitle title={title} image={image} />}
      <Section>{children}</Section>
    </>
  );
}
