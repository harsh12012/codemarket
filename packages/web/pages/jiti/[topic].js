import { useRouter } from "next/router";
import UserLayout from "../../src/app/components/other/UserLayout";
import SubTopicFaqs from "../../src/pages/SubTopicFaqs";

export default function Page() {
  const router = useRouter();
  const { topic } = router.query;
  return (
    <UserLayout authRequired={true}>
      {topic && <SubTopicFaqs topic={topic} />}
    </UserLayout>
  );
}
