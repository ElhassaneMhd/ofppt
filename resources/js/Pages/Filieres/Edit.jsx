import Create from "./Create";

export default function Edit({filiere = {},sectors=[]}) {
  return <Create defaultValues={filiere} sectors={sectors} />
}
