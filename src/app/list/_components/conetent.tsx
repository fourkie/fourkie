import useIsMobile from "@/hooks/is-mobile/use-is-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Content = ({
  post_title,
  post_content,
}: {
  post_title: string;
  post_content: string;
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
      <strong className="text-xl text-grey-8 md:mb-[2px] md:text-2xl">
        {post_title}
      </strong>
      {isMobile ? (
        <AnimatePresence initial={false}>
          <motion.div
            initial={false}
            animate={{
              maxHeight: isExpanded ? 1000 : 40,
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
          className={`max-w-96 break-all px-12 text-center leading-5 md:text-lg`}
        >
          <strong className="block">{post_content}</strong>
        </div>
      )}

      {isOverflowing && isMobile && (
        <div
          aria-label="작성 글 더보기 "
          onClick={() => setIsExpanded(!isExpanded)}
          className="mx-auto w-fit cursor-pointer"
        >
          {isExpanded ? (
            <ChevronUp
              size={18}
              className="transform text-grey-6 transition-all hover:scale-110"
            />
          ) : (
            <ChevronDown
              size={18}
              className="transform text-grey-6 transition-all hover:scale-110"
            />
          )}
        </div>
      )}
    </>
  );
};

export default Content;
