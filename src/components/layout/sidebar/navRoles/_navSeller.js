//
import { ROLES } from '@/services/auth/permission-maps';

//icons
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
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
            title: 'Sistema de gestion',
            caption: 'De inventario y ventas',
            type: 'group',
            icon: NavigationOutlinedIcon,
            children: [
                {
                    id: 'dashboard',
                    title: 'Panel de datos',
                    type: 'item',
                    icon: HomeIcon,
                    url: '/admin',
                },
            ],
        },
        {
            id: 'ui-element',
            title: 'Tienda',
            //caption: 'Material UI Components',
            type: 'group',
            icon: HotTubIcon,
            children: [
                {
                    id: 'ventas',
                    title: 'Ventas',
                    type: 'item',
                    icon: LocalGroceryStoreOutlinedIcon,
                    url: '/admin/venta',
                },
                {
                    id: 'productos',
                    title: 'Productos',
                    type: 'item',
                    icon: EmojiSymbolsOutlinedIcon,
                    url: '/admin/producto',
                },
            ],
        },
        {
            id: 'personal',
            title: 'Contactos',
            //caption: 'Material UI Components',
            type: 'group',
            icon: HotTubIcon,
            children: [
                {
                    id: 'cliente',
                    title: 'Clientes',
                    type: 'item',
                    icon: SupervisedUserCircleOutlinedIcon,
                    url: '/admin/cliente',
                },
            ],
        },
        {
            id: 'tools',
            title: 'Herramientas',
            //caption: 'Material UI Components',
            type: 'group',
            icon: HotTubIcon,
            children: [
                {
                    id: 'help',
                    title: 'Ayuda',
                    type: 'item',
                    icon: HelpOutlineOutlinedIcon,
                    url: '/admin/ayuda',
                },
                {
                    id: 'accessibility',
                    title: 'Accesibilidad',
                    type: 'item',
                    icon: AccessibilityOutlinedIcon,
                    url: '/admin/accessibilidad',
                },
            ],
        },
    ],
};

export default nav;
