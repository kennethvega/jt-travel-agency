import { RiProductHuntLine, RiDoubleQuotesL, RiQuestionnaireLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsCalendarDate } from 'react-icons/bs';

export const menu = [
  {
    title: 'Products',
    icon: <RiProductHuntLine />,
    path: '/',
  },
  {
    title: 'Bookings',
    icon: <BsCalendarDate />,
    path: '/bookings',
  },
  {
    title: 'Customer review',
    icon: <RiDoubleQuotesL />,
    path: '/customer-review',
  },
  {
    title: "FAQ's",
    icon: <RiQuestionnaireLine />,
    path: '/faq',
  },
  {
    title: 'Settings',
    icon: <IoSettingsOutline />,
    path: '/account-settings',
  },
];
