import CheckIn from "../src/pages/CheckIn";
import UserLayout from "../src/app/components/other/UserLayout";

export default function Page() {
  return (
    <UserLayout authRequired={true}>
      <CheckIn />
    </UserLayout>
  );
}
