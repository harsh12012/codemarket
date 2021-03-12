import { useRouter } from "next/router";
import UserLayout from "../../../src/app/components/other/UserLayout";
import ManageStaff from "../../../src/app/components/listings/ManageStaff";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <UserLayout authRequired={true}>{id && <ManageStaff id={id} />}</UserLayout>
  );
}
