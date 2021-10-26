import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import NavigationOutlinedIcon from '@material-ui/icons/NavigationOutlined';
import LocalGroceryStoreOutlinedIcon from '@material-ui/icons/LocalGroceryStoreOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import RecentActorsOutlinedIcon from '@material-ui/icons/RecentActorsOutlined';
import EmojiSymbolsOutlinedIcon from '@material-ui/icons/EmojiSymbolsOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
import HotTubIcon from '@material-ui/icons/HotTub';
import HomeIcon from '@material-ui/icons/Home';

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
                    url: '/admin/dashboard',
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
                    type: 'collapse',
                    icon: EmojiSymbolsOutlinedIcon,
                    children: [
                        {
                            id: 'items',
                            title: 'Productos',
                            type: 'item',
                            url: '/admin/producto',
                        },
                        {
                            id: 'categorias',
                            title: 'Categorias',
                            type: 'item',
                            url: '/admin/categoria',
                        }
                    ],
                },
                {
                    id: 'inventario',
                    title: 'Inventarios',
                    type: 'item',
                    icon: AssessmentOutlinedIcon,
                    url: '/admin/inventario',
                },
                {
                    id: 'bitacora',
                    title: 'Bitacoras',
                    type: 'item',
                    icon: ClassOutlinedIcon,
                    url: '/admin/bitacoras'
                },
                {
                    id: 'caja',
                    title: 'Cajas',
                    type: 'item',
                    icon: SettingsRemoteIcon,
                    url: '/admin/caja',
                }
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
                {
                    id: 'empleado',
                    title: 'Empleados',
                    type: 'item',
                    icon: SupervisorAccountOutlinedIcon,
                    url: '/admin/empleado',
                },
                {
                    id: 'proveedor',
                    title: 'Proveedores',
                    type: 'item',
                    icon: RecentActorsOutlinedIcon,
                    url: '/admin/proveedor',
                },
            ],
        },
    ],
};

export default nav;
