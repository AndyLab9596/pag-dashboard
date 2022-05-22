import React from 'react';
import { ModalHeader } from '@chakra-ui/modal';
import { Text, Flex, useDisclosure, Grid, Button } from '@chakra-ui/react';
import ProfileTab from './ProfileTab';
import FormTab from './FormTab';
import ReminderTab from './ReminderTab';
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom';
import ModalLayout from 'app/components/Modal';

interface stateInterface {
  userName: string | undefined;
}

/**
 * @param ProfileModal
 * @returns modal profile user
 * This modal will get param from URL, which is a user ID and user's name, from this ID will be pass to useQuery to get user data and user's name will be pass as title of modal.
 * To use this modal, at the top level compo, You need to import ProfileModalRouter (eg: <ProfileModalRouter />), secondly, import useRouteMatch (eg: const { url } = useRouteMatch()) and then pass the url to the path along the userid & user'name (eg: <link to={{pathname: `${url}/modal/123435/John Doe`}} />).
 * For more detail contact @quangtrung995
 */

const ProfileModal = ({ isOpen }) => {
  const { onClose } = useDisclosure();
  const navigate = useNavigate();
  const { userID } = useParams<{ [key: string]: string }>();
  const { state, search, pathname } = useLocation();
  const params = new URLSearchParams(search);

  ///hook
  const [active, setActive] = React.useState(0);
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    if (state) {
      setUserName(() => {
        return (state as stateInterface).userName ?? '';
      });
    }
  }, [userID]);

  ///func to handle events
  const onCloseModal = () => {
    let path = pathname.split('/profile')[0];
    navigate({
      pathname: path,
      search: params.toString(),
    });

    setActive(0);
    onClose();
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onCloseModal} size={'4xl'} isCentered={false} padding={'1.25rem'}>
      <>
        <ModalHeader color="black">
          <Flex direction="row" alignItems="center">
            <Text color={'rgb(63, 83, 110)'} textTransform="capitalize" fontSize="lg" fontWeight="semibold">
              {userName}
            </Text>
          </Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={3} my={5}>
            {router.map((item, index) => (
              <Button
                key={`route_${index}`}
                fontSize={'md'}
                width="full"
                textTransform="capitalize"
                backgroundColor={active === index ? '#0067ac' : undefined}
                onClick={() => {
                  navigate({
                    pathname: item.path,
                    search: params.toString(),
                  });
                  setActive(index);
                }}
              >
                {item.name}
              </Button>
            ))}
          </Grid>
        </ModalHeader>
        <Routes>
          {router.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component userId={userID!} onUpdateSuccess={onCloseModal} />} />
          ))}
        </Routes>
      </>
    </ModalLayout>
  );
};

//static
const router = [
  {
    id: 0,
    path: '',
    name: 'profile',
    component: ProfileTab,
  },
  {
    id: 1,
    path: 'forms',
    name: 'forms',
    component: FormTab,
  },
  {
    id: 2,
    path: 'reminders',
    name: 'reminders',
    component: ReminderTab,
  },
];
export default ProfileModal;
