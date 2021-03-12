import UserLayout from '../src/app/components/other/UserLayout';
import PayoutDeposit from '../src/app/components/reports/PayoutDeposit';
import SpaceOwnerContainer from '../src/app/components/SpaceOwnerContainer';

export default function Page() {
  return (
    <UserLayout authRequired={true}>
      <SpaceOwnerContainer>
        <PayoutDeposit />
      </SpaceOwnerContainer>
    </UserLayout>
  );
}
