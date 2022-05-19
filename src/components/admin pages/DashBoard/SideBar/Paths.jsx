import AcUnitIcon from '@mui/icons-material/AcUnit';


const utilities = {
    id: 'Admin Dash Board',
    title: 'Admin Dash Board',
    type: 'group',
    children: [
        {
            id: 'movies',
            title: 'Movies',
            type: 'item',
            url: '/dash-board/movies',
            icon: AcUnitIcon,
            breadcrumbs: false
        },
        {
            id: 'theaters',
            title: 'Theaters',
            type: 'item',
            url: '/dash-board/theaters',
            icon: AcUnitIcon,
            breadcrumbs: false
        },
        {
            id: 'details',
            title: 'Details',
            type: 'item',
            url: '/dash-board/details',
            icon: AcUnitIcon,
            breadcrumbs: false
        },
        {
            id: 'home',
            title: 'Home',
            type: 'item',
            url: '/',
            icon: AcUnitIcon,
            breadcrumbs: false
        }

    ]
};

export default utilities;
