import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import tw, { styled } from "twin.macro";
import { Close } from "@comp/icons/Close";

export function Modal({ open, content, selector, onClick }) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted
    ? createPortal(
        open && (
          <ModalBox>
            <StyledBox>
              <StyledButtonBox>
                <ModalButton type="button" onClick={onClick} tabIndex={0}>
                  <Close />
                </ModalButton>
              </StyledButtonBox>

              <ModalContent dangerouslySetInnerHTML={{ __html: content }} />
            </StyledBox>
          </ModalBox>
        ),
        ref.current
      )
    : null;
}

const ModalBox = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  ${tw`fixed inset-0 z-50 flex items-center justify-center h-screen p-2 text-xs `}
`;
const StyledBox = styled.div`
  ${tw`flex flex-col break-words text-xl`}
`;
const ModalContent = styled.div`
  max-height: 75vh;
  ${tw`px-4 py-2 pb-8 overflow-x-hidden overflow-y-auto bg-bg rounded-b`}
`;
const StyledButtonBox = tw.div`bg-bg rounded-t relative top-px`;
const ModalButton = tw.button`float-right my-4 p-2`;
