import { useRouter } from "next/router";
import UserLayout from "../../src/app/components/other/UserLayout";
import ChatScreen from "../../src/pages/ChatScreen";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <UserLayout authRequired={true}>{id && <ChatScreen id={id} />}</UserLayout>
  );
}
