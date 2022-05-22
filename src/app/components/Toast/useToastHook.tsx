import { useToast } from '@chakra-ui/toast';

interface ToastHook {
  title: string;
  description?: string;
  status: 'success' | 'error' | 'warning' | 'info';
}

const useToastStatus = () => {
  const toast = useToast();

  return ({ status, title, description }: ToastHook) => {
    toast.closeAll();
    return (
      !toast.isActive(`${title}`) &&
      toast({
        id: title,
        title: title,
        description: description,
        status: status,
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
    );
  };
};

export default useToastStatus;
