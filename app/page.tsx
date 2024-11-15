import { Navbar } from "./_components/shared/navbar";
import { validateAuthentication } from "./_utils/validateAuthentication";

export default async function Home() {
  validateAuthentication();

  return (
    <>
      <Navbar />
    </>
  );
}
