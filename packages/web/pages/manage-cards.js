import ManageCards from "../src/app/components/manageCard/ManageCards";
import UserLayout from "../src/app/components/other/UserLayout";

export default function ManageCardsPage() {
  return (
    <UserLayout authRequired={true}>
      <ManageCards />
    </UserLayout>
  );
}
