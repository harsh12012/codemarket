import { useRouter } from "next/router";
import AdminLayout from "../../../../src/app/components/other/AdminLayout";
import SubTopicFaqs from "../../../../src/pages/SubTopicFaqs";

export default function Page() {
  const router = useRouter();
  const { topic } = router.query;
  return (
     <AdminLayout>
          {topic && <SubTopicFaqs topic={topic} admin={true}/>}
     </AdminLayout>
    
  )
}
