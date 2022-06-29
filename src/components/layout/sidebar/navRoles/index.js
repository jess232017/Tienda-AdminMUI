import _navAdmin from './_navAdmin';
import _navCashier from './_navCashier';
import _navGrocer from './_navGrocer';
import _navSeller from './_navSeller';

//
import { ROLES } from '@/services/auth/permission-maps';

const navRoles = {};

navRoles[ROLES.administrador] = _navAdmin;
navRoles[ROLES.bodeguero] = _navGrocer;
navRoles[ROLES.vendedor] = _navSeller;
navRoles[ROLES.cajero] = _navCashier;

export default navRoles;
