import useIsMobile from "@/hooks/is-mobile/use-is-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Content = ({
  post_title,
  post_content,
  isMyPost,
}: {
  post_title: string;
  post_content: string;
  isMyPost: boolean;
}) => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const lineHeight = parseFloat(getComputedStyle(contentEl).lineHeight);
    const maxHeight = lineHeight * 2;

    if (contentEl.scrollHeight > maxHeight) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [post_content]);

  return (
    <>
      {isMyPost && (
        <>
          <strong className="text-xl text-grey-8 md:text-2xl">
            {post_title}
          </strong>
          {isMobile ? (
            <AnimatePresence initial={false}>
              <motion.div
                initial={false} // ★ 키포인트: 최초 진입시에만 초기값 무시
                animate={{
                  maxHeight: isExpanded ? 1000 : 40, // ★ 넉넉히 (두 줄 기준)
                  transition: { duration: 0.7, ease: "easeInOut" },
                }}
                exit={{
                  maxHeight: 40,
                  transition: { duration: 0.7, ease: "easeInOut" },
                }}
                className="overflow-hidden"
              >
                <div
                  ref={contentRef}
                  className={`max-w-96 break-all px-12 text-center leading-5 md:text-xl`}
                >
                  <strong className="block">{post_content}</strong>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div
              ref={contentRef}
              className={`max-w-96 break-all px-12 text-center leading-5 md:text-xl`}
            >
              <strong className="block">{post_content}</strong>
            </div>
          )}
        </>
      )}

      {isMyPost && isOverflowing && isMobile && (
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="mx-auto w-fit cursor-pointer"
        >
          {isExpanded ? (
            <ChevronUp size={18} className="text-grey-6" />
          ) : (
            <ChevronDown size={18} className="text-grey-6" />
          )}
        </div>
      )}
    </>
  );
};

export default Content;
