import { useTranslation } from 'react-i18next';
import { ROLES } from '@/services/auth/permission-maps';

//icons
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import SupportAgentIcon from '@mui/icons-material/SupportAgentTwoTone';
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import EmojiSymbolsOutlinedIcon from '@mui/icons-material/EmojiSymbolsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import HotTubIcon from '@mui/icons-material/HotTub';
import HomeIcon from '@mui/icons-material/Home';

const nav = {
    items: [
        {
            id: 'dash',
            title: 'sidebar.title',
            caption: 'sidebar.caption',
            type: 'group',
            icon: NavigationOutlinedIcon,
            children: [
                {
                    id: 'dashboard',
                    title: 'sidebar.dashboard',
                    type: 'item',
                    icon: HomeIcon,
                    url: '/admin',
                },
            ],
        },
        {
            id: 'ui-element',
            title: 'sidebar.store',
            //caption: 'Material UI Components',
            type: 'group',
            icon: HotTubIcon,
            children: [
                {
                    id: 'ventas',
                    title: 'sidebar.sale',
                    type: 'item',
                    icon: LocalGroceryStoreOutlinedIcon,
                    url: '/admin/venta',
                    requireRoles: [ROLES.administrador, ROLES.vendedor],
                },

                {
                    id: 'productos',
                    title: 'sidebar.products',
                    type: 'collapse',
                    icon: EmojiSymbolsOutlinedIcon,
                    children: [
                        {
                            id: 'items',
                            title: 'sidebar.products',
                            type: 'item',
                            url: '/admin/producto',
                            requireRoles: [ROLES.administrador, ROLES.bodeguero],
                        },
                        {
                            id: 'categories',
                            title: 'sidebar.category',
                            type: 'item',
                            url: '/admin/categoria',
                            requireRoles: [ROLES.administrador, ROLES.bodeguero],
                        },
                        {
                            id: 'brands',
                            title: 'sidebar.brand',
                            type: 'item',
                            url: '/admin/marca',
                            requireRoles: [ROLES.administrador, ROLES.vendedor, ROLES.bodeguero],
                        },
                    ],
                },
                {
                    id: 'inventario',
                    title: 'sidebar.inventory',
                    type: 'collapse',
                    icon: AssessmentOutlinedIcon,
                    children: [
                        {
                            id: 'kardex',
                            title: 'Kardex',
                            type: 'item',
                            url: '/admin/inventario',
                        },
                        {
                            id: 'lote',
                            title: 'Lotes',
                            type: 'item',
                            url: '/admin/lote',
                        },
                    ],
                },
                {
                    id: 'session',
                    title: 'sidebar.session',
                    type: 'item',
                    icon: ClassOutlinedIcon,
                    url: '/admin/sesion',
                },
                {
                    id: 'contador',
                    title: 'sidebar.accountant',
                    type: 'item',
                    icon: AccountBalanceWalletIcon,
                    url: '/admin/accountant',
                    requireRoles: [ROLES.administrador, ROLES.vendedor, ROLES.accountat],
                },
            ],
        },
        {
            id: 'personal',
            title: 'sidebar.contacts',
            //caption: 'Material UI Components',
            type: 'group',
            icon: HotTubIcon,
            children: [
                {
                    id: 'cliente',
                    title: 'sidebar.client',
                    type: 'item',
                    icon: SupervisedUserCircleOutlinedIcon,
                    url: '/admin/cliente',
                    requireRoles: [ROLES.administrador, ROLES.cajero, ROLES.vendedor],
                },
                {
                    id: 'empleado',
                    title: 'sidebar.employee',
                    type: 'item',
                    icon: SupervisorAccountOutlinedIcon,
                    url: '/admin/empleado',
                    requireRoles: [ROLES.administrador],
                },
                {
                    id: 'proveedor',
                    title: 'sidebar.providers',
                    type: 'item',
                    icon: RecentActorsOutlinedIcon,
                    url: '/admin/proveedor',
                    requireRoles: [ROLES.administrador, ROLES.bodeguero],
                },
                {
                    id: 'chat',
                    title: 'sidebar.support',
                    type: 'item',
                    icon: SupportAgentIcon,
                    url: '/admin/chat',
                    requireRoles: [ROLES.administrador, ROLES.bodeguero],
                },
            ],
        },
        {
            id: 'tools',
            title: 'sidebar.tool',
            //caption: 'Material UI Components',
            type: 'group',
            icon: HotTubIcon,
            children: [
                {
                    id: 'report',
                    title: 'sidebar.repors',
                    type: 'item',
                    icon: DescriptionIcon,
                    url: '/admin/reporte',
                    requireRoles: [ROLES.administrador],
                },
                {
                    id: 'help',
                    title: 'sidebar.help',
                    type: 'item',
                    icon: HelpOutlineOutlinedIcon,
                    url: '/admin/ayuda',
                },
                {
                    id: 'accessibility',
                    title: 'sidebar.accesibility',
                    type: 'item',
                    icon: AccessibilityOutlinedIcon,
                    url: '/admin/accessibilidad',
                },
            ],
        },
    ],
};

export default nav;
