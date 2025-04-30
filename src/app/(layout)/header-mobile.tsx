"use client";

import PostingButton from "@/app/posting/_components/posting-button";
import { useGetUserNicknameByIdQuery } from "@/hooks/queries/use-get-user-nickname-by-id-query";
import { usePostingStore } from "@/hooks/zustand/posting-store";
import { getUserIdClient } from "@/services/home-client-service";
import Alert from "@/ui/common/alert.common";
import { ChevronLeft } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const headerPaths = [
  { path: "/my-page", title: "마이페이지", needsNickname: true },
  { path: "/friends", title: "내 친구", needsNickname: false },
  { path: "/smookie-makers", title: "스무키 베이커스", needsNickname: false },
  { path: "/term", title: "약관정책", needsNickname: false },
  { path: "/version", title: "버전정보", needsNickname: false },
  { path: "/notice", title: "공지사항", needsNickname: false },
  { path: "/list", title: "기록 목록", needsNickname: true },
  { path: "/posting", title: "기록", needsNickname: true },
];

const backIconPaths = [
  "/friends",
  "/smookie-makers",
  "/term",
  "/version",
  "/notice",
  "/posting",
];

const baseHeaderClass =
  "header-mobile text-grey-8 fixed top-0 flex flex-row items-center justify-between bg-primary-50 block w-full md:hidden p-5 z-40 h-[52px] min-w-[360px]";

const HeaderMobile = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isAlert, setIsAlert] = useState(false);
  const clearInput = usePostingStore((state) => state.clearInput);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = await getUserIdClient();
      if (userId) {
        setUserId(userId);
      }
    };
    fetchUser();
  }, []);

  const {
    data: nickname,
    isPending,
    isError,
  } = useGetUserNicknameByIdQuery(userId, {
    enabled: Boolean(userId),
  });

  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/tutorial") ||
    pathname.startsWith("/music")
  ) {
    return null;
  }

  const nowPath = headerPaths.find((headerpath) =>
    pathname.startsWith(headerpath.path),
  );

  if (nowPath?.needsNickname && (!nickname || isPending || isError)) {
    return <div className={baseHeaderClass}></div>;
  }

  const headerText = nowPath
    ? nowPath.needsNickname
      ? `${nickname?.user_nickname}님의 ${nowPath.title}`
      : nowPath.title
    : nickname && !isPending && !isError
      ? `${nickname.user_nickname}님`
      : "";

  const showBackIcon =
    nowPath && backIconPaths.some((p) => pathname.startsWith(p));

  const handleBack = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    router.back();
  };

  return (
    <div className={baseHeaderClass}>
      {showBackIcon ? (
        <>
          <ChevronLeft
            aria-label="이전 페이지로 이동"
            className="cursor-pointer"
            onClick={() => {
              if (pathname.startsWith("/posting")) {
                setIsAlert(true);
              } else {
                handleBack();
              }
            }}
          />
          <div className="mx-auto text-lg font-bold">{headerText}</div>
          {pathname.startsWith("/posting") && <PostingButton />}
          {isAlert && (
            <Alert
              title="뒤로 가시겠습니까?"
              contents=""
              confirm={() => {
                setIsAlert(false);
                handleBack();
                if (params?.id) {
                  clearInput();
                }
              }}
              setOpenPopup={setIsAlert}
            />
          )}
        </>
      ) : (
        <strong className="mx-auto text-lg">{headerText}</strong>
      )}
    </div>
  );
};

export default HeaderMobile;
