import UserLayout from "../src/app/components/other/UserLayout";
import StripeConnect from "../src/app/components/stripe/StripeConnect";

export default function Page() {
  return (
    <UserLayout authRequired={true}>
      <StripeConnect />
    </UserLayout>
  );
}
