import { reactive } from 'vue';

interface RemoveModalInput {
  id: string;
  projectName: string;
}

interface RemoveModalState extends RemoveModalInput {
  isOpen: boolean;
}

export interface ModalState {
  removeModal: RemoveModalState;
  createProjectModal: {
    isOpen: boolean;
  };
  loadingModal: {
    isOpen: boolean;
  };
}

export type ModalKinds = 'remove-project' | 'create-project' | 'loading';

export const MODAL_KINDS = {
  removeProject: 'remove-project' as ModalKinds,
  createProject: 'create-project' as ModalKinds,
  loadingModal: 'loading' as ModalKinds,
};

export const useModals = () => {
  const modalState = reactive<ModalState>({
    removeModal: {
      isOpen: false,
      id: '',
      projectName: '',
    },
    createProjectModal: {
      isOpen: false,
    },
    loadingModal: {
      isOpen: false,
    },
  });

  const openModal = (kind: ModalKinds, data?: RemoveModalInput) => {
    switch (kind) {
      case MODAL_KINDS.createProject:
        modalState.loadingModal.isOpen = false;
        modalState.removeModal.isOpen = false;
        modalState.createProjectModal.isOpen = true;
        break;
      case MODAL_KINDS.removeProject:
        modalState.loadingModal.isOpen = false;
        modalState.createProjectModal.isOpen = false;
        modalState.removeModal.isOpen = true;
        modalState.removeModal.id = data?.id || '';
        modalState.removeModal.projectName = data?.projectName || '';
        break;
      case MODAL_KINDS.loadingModal:
        modalState.removeModal.isOpen = false;
        modalState.createProjectModal.isOpen = false;
        modalState.loadingModal.isOpen = true;
        break;
      default:
        break;
    }
  };

  const isModalOpened = (kind?: ModalKinds): boolean => {
    switch (kind) {
      case MODAL_KINDS.createProject:
        return modalState.createProjectModal.isOpen;
      case MODAL_KINDS.removeProject:
        return modalState.removeModal.isOpen;
      case MODAL_KINDS.loadingModal:
        return modalState.loadingModal.isOpen;
      default:
        return (
          modalState.createProjectModal.isOpen ||
          modalState.removeModal.isOpen ||
          modalState.loadingModal.isOpen
        );
    }
  };

  const closeModal = (kind?: ModalKinds): void => {
    switch (kind) {
      case MODAL_KINDS.createProject:
        modalState.createProjectModal.isOpen = false;
        break;
      case MODAL_KINDS.removeProject:
        modalState.removeModal.isOpen = false;
        break;
      case MODAL_KINDS.loadingModal:
        modalState.loadingModal.isOpen = false;
        break;
      default:
        modalState.createProjectModal.isOpen = false;
        modalState.removeModal.isOpen = false;
        modalState.loadingModal.isOpen = false;
        break;
    }
  };

  return { modalState, openModal, isModalOpened, closeModal };
};
