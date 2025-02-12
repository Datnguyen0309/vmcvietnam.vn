import { FormPoup } from "@/components/layout/FormContact";
import { disableScroll, enableScroll } from "@/utils/scrollmodal";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

interface ModalContextProps {
  isOpen: boolean;
  openModal: (content?: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [id, setId] = useState("");
  const [href, setHref] = useState("");

  useEffect(() => {
    const getForm = async () => {
      try {
        const res = await fetch(`/api/data-form/?type=form-poup`);
        const data = await res.json();
        const id = data?.id || "";
        id && setId(id);
        const href = data?.href || "";
        href && setHref(href);
      } catch (error) {
        console.log(error);
      }
    };
    getForm();
  }, []);

  const openModal = (content?: ReactNode) => {
    setContent(content || <FormPoup id={id} href={href} />);
    setIsOpen(true);
    disableScroll();
  };

  const closeModal = () => {
    setIsOpen(false);
    enableScroll();
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && (
        <div
          id="hs-slide-down-animation-modal"
          className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto pointer-events-none"
        >
          <div
            className="flex justify-center items-center min-h-screen bg-black bg-opacity-50 pointer-events-auto"
            onClick={closeModal}
          >
            <div
              className="bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-white dark:border-neutral-400 dark:shadow-neutral-700/70 sm:max-w-lg sm:w-full m-3 sm:mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center py-3 px-4">
                <div className="flex-1 text-2xl font-bold text-blue-900">
                  Để lại thông tin
                </div>
                <button
                  type="button"
                  className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 "
                  onClick={closeModal}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="px-4 overflow-y-auto">{content}</div>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
