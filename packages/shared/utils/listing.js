// eslint-disable-next-line import/prefer-default-export
export const getRole = ({ ownerId, userId, staff = [] }) => {
  let role = '';
  if (ownerId === userId) {
    role = 'Owner';
  } else {
    const tempStaff = staff.filter((s) => s.staffId === userId);
    if (tempStaff && tempStaff.length > 0) {
      role = tempStaff[0].role;
    } else {
      role = 'SuperAdmin';
    }
  }
  return role;
};
