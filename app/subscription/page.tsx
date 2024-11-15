import { Navbar } from "../_components/shared/navbar";
import { validateAuthentication } from "../_utils/validateAuthentication";

export default function SubscriptionPage() {
  validateAuthentication();

  return (
    <>
      <Navbar />
    </>
  );
}
