import UserLayout from "../../src/app/components/other/UserLayout";
import Video from "../../src/pages/Video";

export default function Page() {
  return (
    
    <UserLayout authRequired={true}>
      <Video />
    </UserLayout>
  );
}
